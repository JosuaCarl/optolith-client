import R from 'ramda';
import { ActivatableDependent } from '../types/data.d';
import { SpecialAbility } from '../types/wiki';
import { List, Maybe, OrderedMap, Record } from './dataUtils';
import { isBlessedTraditionId, isMagicalTraditionId } from './IDUtils';
import { isActive } from './isActive';

const isActiveMagicalTradition = (e: Record<ActivatableDependent>) => {
  return isMagicalTraditionId(e.get('id')) && isActive(e);
};

const isActiveBlessedTradition = (e: Record<ActivatableDependent>) => {
  return isBlessedTraditionId(e.get('id')) && isActive(e);
};

/**
 * Get magical traditions' dependent entries.
 * @param list
 */
export const getMagicalTraditions =
  (list: OrderedMap<string, Record<ActivatableDependent>>) =>
    list.elems().filter(isActiveMagicalTradition);


/**
 * Get magical traditions' wiki entries.
 * @param wiki
 * @param list
 */
export const getMagicalTraditionsFromWiki = (
  wiki: OrderedMap<string, Record<SpecialAbility>>,
  list: OrderedMap<string, Record<ActivatableDependent>>,
): List<Record<SpecialAbility>> => R.pipe(
  getMagicalTraditions,
  Maybe.mapMaybe(e => e.lookup('id').bind(wiki.lookup)),
)(list);

/**
 * Get blessed tradition's' dependent entry.
 * @param list
 */
export const getBlessedTradition =
  (list: OrderedMap<string, Record<ActivatableDependent>>) =>
    list.elems().find(isActiveBlessedTradition);

/**
 * Get blessed tradition's' wiki entry.
 * @param wiki
 * @param list
 */
export const getBlessedTraditionFromWiki = (
  wiki: OrderedMap<string, Record<SpecialAbility>>,
  list: OrderedMap<string, Record<ActivatableDependent>>,
) => getBlessedTradition(list).bind(e => e.lookup('id').bind(wiki.lookup));