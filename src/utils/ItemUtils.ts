import { pipe } from 'ramda';
import { IdPrefixes } from '../constants/IdPrefixes';
import { EditItem } from './heroData/EditItem';
import { EditPrimaryAttributeDamageThreshold } from './heroData/EditPrimaryAttributeDamageThreshold';
import { Item } from './heroData/Item';
import { prefixRawId } from './IDUtils';
import { ifElse } from './ifElse';
import { getLevelElementsWithZero } from './levelUtils';
import { gt } from './mathUtils';
import { toFloat, toInt } from './NumberUtils';
import { equals } from './structures/Eq';
import { all, fromArray, fromElements, isList, length, List, map } from './structures/List';
import { bind_, ensure, fmap, Just, mapMaybe, Maybe, maybe, Nothing, product, sum } from './structures/Maybe';
import { Record } from './structures/Record';
import { show } from './structures/Show';
import { PrimaryAttributeDamageThreshold } from './wikiData/sub/PrimaryAttributeDamageThreshold';

const ifNumberOrEmpty = maybe<number, string> ('') (show)

const convertDamageBonusToEdit =
  maybe<Record<PrimaryAttributeDamageThreshold>, Record<EditPrimaryAttributeDamageThreshold>>
    (EditPrimaryAttributeDamageThreshold ({
      threshold: '',
    }))
    (damageBonus => EditPrimaryAttributeDamageThreshold ({
      primary: PrimaryAttributeDamageThreshold.A.primary (damageBonus),
      threshold: ifElse<number | List<number>, List<number>, string | List<string>>
        (isList)
        (map (show))
        (show)
        (PrimaryAttributeDamageThreshold.A.threshold (damageBonus)),
    }))

export const convertToEdit =
  (item: Record<Item>): Record<EditItem> =>
    EditItem ({
      id: Just (Item.A.id (item)),
      name: Item.A.name (item),
      ammunition: Item.A.ammunition (item),
      combatTechnique: Item.A.combatTechnique (item),
      damageDiceSides: Item.A.damageDiceSides (item),
      gr: Item.A.gr (item),
      isParryingWeapon: Item.A.isParryingWeapon (item),
      isTemplateLocked: Item.A.isTemplateLocked (item),
      reach: Item.A.reach (item),
      template: Item.A.template (item),
      where: Item.A.where (item),
      isTwoHandedWeapon: Item.A.isTwoHandedWeapon (item),
      improvisedWeaponGroup: Item.A.improvisedWeaponGroup (item),
      loss: Item.A.loss (item),
      forArmorZoneOnly: Item.A.forArmorZoneOnly (item),
      addPenalties: Item.A.addPenalties (item),
      armorType: Item.A.armorType (item),
      at: ifNumberOrEmpty (Item.A.at (item)),
      iniMod: ifNumberOrEmpty (Item.A.iniMod (item)),
      movMod: ifNumberOrEmpty (Item.A.movMod (item)),
      damageBonus: convertDamageBonusToEdit (Item.A.damageBonus (item)),
      damageDiceNumber: ifNumberOrEmpty (Item.A.damageDiceNumber (item)),
      damageFlat: ifNumberOrEmpty (Item.A.damageFlat (item)),
      enc: ifNumberOrEmpty (Item.A.enc (item)),
      length: ifNumberOrEmpty (Item.A.length (item)),
      amount: show (Item.A.amount (item)),
      pa: ifNumberOrEmpty (Item.A.pa (item)),
      price: show (Item.A.price (item)),
      pro: ifNumberOrEmpty (Item.A.pro (item)),
      range: maybe<List<number>, List<string>> (fromElements ('', '', ''))
                                              (map (show))
                                              (Item.A.range (item)),
      reloadTime: ifNumberOrEmpty (Item.A.reloadTime (item)),
      stp: ifNumberOrEmpty (Item.A.stp (item)),
      weight: show (Item.A.weight (item)),
      stabilityMod: ifNumberOrEmpty (Item.A.stabilityMod (item)),
    })

const toMaybeIntGreaterThan =
  (int: number) => pipe (toInt, bind_<number, number> (ensure (gt (int))))

const toMaybeIntGreaterThan0 = toMaybeIntGreaterThan (0)
const toMaybeIntGreaterThan1 = toMaybeIntGreaterThan (1)

const convertDamageBonusToSave =
  (damageBonus: Record<EditPrimaryAttributeDamageThreshold>) =>
    ifElse<string | List<string>, List<string>, Maybe<Record<PrimaryAttributeDamageThreshold>>>
      (isList)
      (threshold => all<string> (e => e .length > 0) (threshold)
        ? Just (PrimaryAttributeDamageThreshold ({
          primary: EditPrimaryAttributeDamageThreshold.A.primary (damageBonus),
          threshold: mapMaybe<string, number> (toInt) (threshold),
        }))
        : Nothing)
      (threshold => threshold .length > 0
        ? fmap ((safeThreshold: number) => PrimaryAttributeDamageThreshold ({
                 primary: EditPrimaryAttributeDamageThreshold.A.primary (damageBonus),
                 threshold: safeThreshold,
               }))
               (toInt (threshold))
        : Nothing)
      (EditPrimaryAttributeDamageThreshold.A.threshold (damageBonus))

export const convertToSave =
  (id: string) =>
  (item: Record<EditItem>): Record<Item> =>
    Item ({
      id,
      name: EditItem.A.name (item),
      ammunition: EditItem.A.ammunition (item),
      combatTechnique: EditItem.A.combatTechnique (item),
      damageDiceSides: EditItem.A.damageDiceSides (item),
      gr: EditItem.A.gr (item),
      isParryingWeapon: EditItem.A.isParryingWeapon (item),
      isTemplateLocked: EditItem.A.isTemplateLocked (item),
      reach: EditItem.A.reach (item),
      template: EditItem.A.template (item),
      where: EditItem.A.where (item),
      isTwoHandedWeapon: EditItem.A.isTwoHandedWeapon (item),
      improvisedWeaponGroup: EditItem.A.improvisedWeaponGroup (item),
      loss: EditItem.A.loss (item),
      forArmorZoneOnly: EditItem.A.forArmorZoneOnly (item),
      addPenalties: EditItem.A.addPenalties (item),
      armorType: EditItem.A.armorType (item),
      at: toInt (EditItem.A.at (item)),
      iniMod: toMaybeIntGreaterThan0 (EditItem.A.iniMod (item)),
      movMod: toMaybeIntGreaterThan0 (EditItem.A.movMod (item)),
      damageBonus: convertDamageBonusToSave (EditItem.A.damageBonus (item)),
      damageDiceNumber: toInt (EditItem.A.damageDiceNumber (item)),
      damageFlat: toInt (EditItem.A.damageFlat (item)),
      enc: toInt (EditItem.A.enc (item)),
      length: toFloat (EditItem.A.length (item)),
      amount: product (toMaybeIntGreaterThan1 (EditItem.A.amount (item))),
      pa: toInt (EditItem.A.pa (item)),
      price: toFloat (EditItem.A.price (item)),
      pro: toInt (EditItem.A.pro (item)),
      range: ensure<List<number>> (pipe (length, equals (3)))
                                  (mapMaybe (toInt) (EditItem.A.range (item))),
      reloadTime: toInt (EditItem.A.reloadTime (item)),
      stp: toInt (EditItem.A.stp (item)),
      weight: sum (toFloat (EditItem.A.weight (item))),
      stabilityMod: toInt (EditItem.A.stabilityMod (item)),
    })

export const convertPrimaryAttributeToArray =
  (id: string): List<string> =>
    fromArray (id .split (/_/) .slice (1) .map (prefixRawId (IdPrefixes.ATTRIBUTES)))

export const getLossLevelElements = () => getLevelElementsWithZero (4)
