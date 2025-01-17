import { equals } from "../../../Data/Eq"
import { flip, thrush } from "../../../Data/Function"
import { fmap } from "../../../Data/Functor"
import { Lens_, over, set, view } from "../../../Data/Lens"
import { all, append, concatMap, cons, elem, empty, filter, findIndex, foldr, isList, List, ListI, map, mapAccumL, modifyAt, partition, pure } from "../../../Data/List"
import { alt_, and, bindF, fromJust, fromMaybe, isJust, isNothing, Just, liftM2, listToMaybe, Maybe, maybe, Nothing, or } from "../../../Data/Maybe"
import { gt } from "../../../Data/Num"
import { lookup } from "../../../Data/OrderedMap"
import { Record } from "../../../Data/Record"
import { fst, Pair, snd, uncurry } from "../../../Data/Tuple"
import { SpecialAbilityGroup } from "../../Constants/Groups"
import { SpecialAbilityId } from "../../Constants/Ids.gen"
import { ActivatableDependent } from "../../Models/ActiveEntries/ActivatableDependent"
import { ActiveObject } from "../../Models/ActiveEntries/ActiveObject"
import { HeroModel, HeroModelL, HeroModelRecord } from "../../Models/Hero/HeroModel"
import { StyleDependency, StyleDependencyL } from "../../Models/Hero/StyleDependency"
import { SpecialAbility } from "../../Models/Wiki/SpecialAbility"
import { pipe, pipe_ } from "../pipe"
import { misStringM } from "../typeCheckUtils"

const HA = HeroModel.A
const HL = HeroModelL

const SAA = SpecialAbility.A
const ADA = ActivatableDependent.A
const SDA = StyleDependency.A
const AOA = ActiveObject.A

type StyleDependenciesLens = Lens_<HeroModelRecord, List<Record<StyleDependency>>>

export type StyleDependencyStateKeys = "combatStyleDependencies"
                                     | "magicalStyleDependencies"
                                     | "blessedStyleDependencies"
                                     | "skillStyleDependencies"

/**
 * Checks if the given entry is a Style Special Ability and which state key it
 * belongs to.
 */
const lensByStyle =
  (x: Record<SpecialAbility>): Maybe<StyleDependenciesLens> => {
    switch (SAA.gr (x)) {
      case SpecialAbilityGroup.CombatStylesArmed:
      case SpecialAbilityGroup.CombatStylesUnarmed:
        return Just (HL.combatStyleDependencies)

      case SpecialAbilityGroup.MagicalStyles:
        return Just (HL.magicalStyleDependencies)

      case SpecialAbilityGroup.BlessedStyles:
        return Just (HL.blessedStyleDependencies)

      case SpecialAbilityGroup.SkillStyles:
        return Just (HL.skillStyleDependencies)

      default:
        return Nothing
    }
  }

/**
 * Checks if the given entry is an Extended Special Ability and which state key
 * it belongs to.
 */
const lensByExtended =
  (x: Record<SpecialAbility>): Maybe<StyleDependenciesLens> => {
    switch (SAA.gr (x)) {
      case SpecialAbilityGroup.CombatExtended:
        return Just (HL.combatStyleDependencies)

      case SpecialAbilityGroup.MagicalExtended:
        return Just (HL.magicalStyleDependencies)

      case SpecialAbilityGroup.KarmaExtended:
        return Just (HL.blessedStyleDependencies)

      case SpecialAbilityGroup.SkillExtended:
        return Just (HL.skillStyleDependencies)

      default:
        return Nothing
    }
  }

const moveActiveInListToNew: (newxs: List<Record<StyleDependency>>) =>
                             (x: Record<StyleDependency>) =>
                             Pair<List<Record<StyleDependency>>, Record<StyleDependency>> =
  newxs => x => {
    const current_id = SDA.id (x)
    const current_active = SDA.active (x)

    // If the dependency has got a list of possible ids and
    // is used, we check if the used id is included in the
    // new dependencies as a dependency without a list of
    // options to make more special abilities possible
    if (isList (current_id) && isJust (current_active)) {
      const index =
        findIndex (pipe (
                          SDA.id,
                          equals,
                          thrush (fromJust (current_active))
                        ))
                  (newxs)

      if (isJust (index)) {
        return Pair (
          modifyAt (fromJust (index))
                   (set (StyleDependencyL.active)
                        (current_active))
                   (newxs),
          set (StyleDependencyL.active)
              (Nothing)
              (x)
        )
      }
    }

    return Pair (newxs, x)
  }


const getStyleDependencies =
  (style_special_ability: Record<SpecialAbility>) =>
  (hero: HeroModelRecord): Maybe<List<Record<StyleDependency>>> => {
    const styleId = SAA.id (style_special_ability)

    return pipe_ (
      style_special_ability,
      SAA.extended,
      fmap (pipe (
        map ((x: string | List<string>) => StyleDependency ({ id: x, origin: styleId })),
        xs => {
          switch (styleId) {
            case SpecialAbilityId.scholarDesMagierkollegsZuHoningen:
              return pipe_ (
                hero,
                HA.specialAbilities,
                lookup (SpecialAbilityId.scholarDesMagierkollegsZuHoningen),
                bindF (pipe (ADA.active, listToMaybe)),
                bindF (AOA.sid2),
                misStringM,
                maybe (xs) (id => cons (xs) (StyleDependency ({ id, origin: styleId })))
              )

            default:
              return xs
          }
        }
      ))
    )
  }


/**
 * Adds extended special ability dependencies if the passed entry is a style
 * special ability.
 * @param hero Dependent instances state slice.
 * @param wiki_entry The special ability you want to add extended entry
 * dependencies for.
 * @returns Changed state slice.
 */
export const addStyleExtendedSpecialAbilityDependencies =
  (wiki_entry: Record<SpecialAbility>) =>
  (hero: HeroModelRecord): HeroModelRecord => {
    const ml = lensByStyle (wiki_entry)

    const mnewxs = getStyleDependencies (wiki_entry) (hero)

    type DependencyList = List<Record<StyleDependency>>

    return fromMaybe (hero)
                     (liftM2 ((l: StyleDependenciesLens) => (newxs: DependencyList) =>
                               over (l)
                                    (pipe (
                                      mapAccumL (moveActiveInListToNew)
                                                (newxs),
                                      uncurry (append)
                                    ))
                                    (hero))
                             (ml)
                             (mnewxs))
  }

const getIndexForExtendedSpecialAbilityDependency =
  (wiki_entry: Record<SpecialAbility>) =>
  (xs: List<Record<StyleDependency>>) =>

         // Checks if requested entry is plain dependency
    alt_ (findIndex (pipe (SDA.id, equals<string | List<string>> (SAA.id (wiki_entry))))
                    (xs))

         /**
          * Otherwise check if the requested entry is part of a list of
          * options.
          */
         (() => findIndex ((e: ListI<typeof xs>) => {
                            const e_id = SDA.id (e)

                            return isList (e_id)
                              && elem (SAA.id (wiki_entry)) (e_id)
                          })
                          (xs))

/**
 * Modifies a `StyleDependency` object to show a extended special ability has
 * been added.
 * @param hero Dependent instances state slice.
 * @param wiki_entry The special ability you want to modify a dependency for.
 * @returns Changed state slice.
 */
export const addExtendedSpecialAbilityDependency =
  (wiki_entry: Record<SpecialAbility>) =>
  (hero: HeroModelRecord): HeroModelRecord =>
    fromMaybe
      (hero)
      (fmap ((l: Lens_<HeroModelRecord, List<Record<StyleDependency>>>) =>
              over (l)
                   (xs =>
                     modifyAt
                      (fromMaybe
                        (-1)
                        (getIndexForExtendedSpecialAbilityDependency (wiki_entry)
                                                                     (xs)))
                      (set (StyleDependencyL.active) (Just (SAA.id (wiki_entry))))
                      (xs))
                   (hero))
            (lensByExtended (wiki_entry)))

/**
 * A combination of `addStyleExtendedSpecialAbilityDependencies` and
 * `addExtendedSpecialAbilityDependency`.
 */
export const addAllStyleRelatedDependencies =
  (wiki_entry: Record<SpecialAbility>) =>
    pipe (
      addStyleExtendedSpecialAbilityDependencies (wiki_entry),
      addExtendedSpecialAbilityDependency (wiki_entry)
    )

/**
 * Split the objects from the ability to to be removed (`fst`) and remaining
 * (`snd`) objects.
 */
const getSplittedRemainingAndToRemove =
  (styleId: string) =>
    partition<Record<StyleDependency>> (pipe (SDA.origin, equals (styleId)))

/**
 * Checks if there is a second object to move the active
 * dependency
 */
const checkForAlternativeIndex =
  (dependency: Record<StyleDependency>):
  (leftItems: List<Record<StyleDependency>>) => number =>
    pipe (
      findIndex ((e: Record<StyleDependency>) => {
                  const current_id = SDA.id (e)
                  const current_active = SDA.active (dependency)

                  // If no List, the ids must be equal
                  if (typeof current_id === "string") {
                    return equals (current_active) (Just (current_id))
                  }

                  // Must be in List but List must not be used
                  return isJust (current_active)
                    && elem (fromJust (current_active)) (current_id)
                    && isNothing (SDA.active (e))
                }),
      fromMaybe (-1)
    )

/**
 * Removes extended special ability dependencies if the passed entry is a style
 * special ability.
 * @param hero Dependent instances state slice.
 * @param instance The special ability you want to remove extended entry
 * dependencies for.
 * @returns Changed state slice.
 */
const removeStyleExtendedSpecialAbilityDependencies =
  (wiki_entry: Record<SpecialAbility>) =>
  (hero: HeroModelRecord): HeroModelRecord =>
    fromMaybe
      (hero)
      (fmap ((l: Lens_<HeroModelRecord, List<Record<StyleDependency>>>) =>
              over (l)
                   (xs => {
                     const splitted =
                       getSplittedRemainingAndToRemove (SAA.id (wiki_entry))
                                                       (xs)

                     const itemsToRemove = fst (splitted)
                     const leftItems = snd (splitted)

                     return pipe_ (
                       itemsToRemove,
                       filter (pipe (SDA.active, isJust)),
                       foldr ((d: Record<StyleDependency>) =>
                               modifyAt (checkForAlternativeIndex (d) (leftItems))
                                        (set (StyleDependencyL.active) (SDA.active (d))))
                             (leftItems)
                     )
                   })
                   (hero))
            (lensByStyle (wiki_entry)))

/**
 * Modifies a `StyleDependency` object to show a extended special ability has
 * been removed.
 * @param hero Dependent instances state slice.
 * @param wiki_entry The special ability you want to modify a dependency for.
 * @returns Changed state slice.
 */
const removeExtendedSpecialAbilityDependency =
  (wiki_entry: Record<SpecialAbility>) =>
  (hero: HeroModelRecord): HeroModelRecord =>
    fromMaybe
      (hero)
      (fmap ((l: Lens_<HeroModelRecord, List<Record<StyleDependency>>>) =>
              over (l)
                   (xs => modifyAt
                      (fromMaybe
                        (-1)
                        (getIndexForExtendedSpecialAbilityDependency (wiki_entry)
                                                                     (xs)))
                      (set (StyleDependencyL.active) (Nothing))
                      (xs))
                   (hero))
            (lensByExtended (wiki_entry)))

/**
 * A combination of `removeStyleExtendedSpecialAbilityDependencies` and
 * `removeExtendedSpecialAbilityDependency`.
 */
export const removeAllStyleRelatedDependencies =
  (wiki_entry: Record<SpecialAbility>) =>
    pipe (
      removeStyleExtendedSpecialAbilityDependencies (wiki_entry),
      removeExtendedSpecialAbilityDependency (wiki_entry)
    )

/**
 * Return flat array of available extended special abilities' IDs.
 * @param xs List of set extended special ability objects.
 */
const getAvailableExtendedSpecialAbilities =
  concatMap<Record<StyleDependency>, string>
    (e => {
      if (isNothing (SDA.active (e))) {
        const current_id = SDA.id (e)

        return isList (current_id) ? current_id : pure (current_id)
      }

      return empty
    })

/**
 * Calculates a list of available Extended Special Abilties. The availability is
 * only based on bought Style Special Abilities, so (other) prerequisites have
 * to be checked separately.
 * @param styleDependencies
 */
export const getAllAvailableExtendedSpecialAbilities =
  foldr (pipe (getAvailableExtendedSpecialAbilities, append)) (empty)


/**
 * Checks if the passed special ability is a style and if it is valid to remove
 * based on registered extended special abilities.
 * @param state Dependent instances state slice.
 * @param entry The special ability to check.
 */
export const isStyleValidToRemove =
  (hero: HeroModelRecord):
  (mwiki_entry: Maybe<Record<SpecialAbility>>) => boolean =>
    pipe (
      fmap (
        (wiki_entry: Record<SpecialAbility>) =>
          and (fmap ((l: Lens_<HeroModelRecord, List<Record<StyleDependency>>>) => {
                      const splitted =
                        getSplittedRemainingAndToRemove (SAA.id (wiki_entry))
                                                        (view (l) (hero))

                      const itemsToRemove = fst (splitted)
                      const leftItems = snd (splitted)

                      return pipe (
                               filter<Record<StyleDependency>> (pipe (SDA.active, isJust)),
                               all (pipe (flip (checkForAlternativeIndex) (leftItems), gt (-1)))
                             )
                             (itemsToRemove)
                    })
                    (lensByStyle (wiki_entry)))
      ),
      or
    )
