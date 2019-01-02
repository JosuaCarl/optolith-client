import { pipe } from 'ramda';
import { ActivatableDependency } from '../../types/data';
import { ActivatableDependent } from '../activeEntries/ActivatableDependent';
import { ActiveObject } from '../activeEntries/ActiveObject';
import { DependencyObject } from '../activeEntries/DependencyObject';
import { consF, find, foldl, List } from '../structures/List';
import { alt_, bind, bind_, elem_, ensure, fmap, fromMaybe, Just, liftM2, mapMaybe, Maybe } from '../structures/Maybe';
import { alter, OrderedMap } from '../structures/OrderedMap';
import { isRecord, Record } from '../structures/Record';
import { Advantage } from '../wikiData/Advantage';
import { SelectOption } from '../wikiData/sub/SelectOption';
import { Activatable } from '../wikiData/wikiTypeHelpers';

const { select } = Advantage.A
const { id: getId, name, cost } = SelectOption.A
const { active, dependencies } = ActivatableDependent.A
const { sid, sid2 } = ActiveObject.A

/**
 * Get a selection option with the given id from given wiki entry. Returns
 * `Nothing` if not found.
 * @param obj The entry.
 */
export const findSelectOption =
  (obj: Activatable) =>
  (id: Maybe<string | number>): Maybe<Record<SelectOption>> =>
    bind<List<Record<SelectOption>>, Record<SelectOption>>
      (select (obj))
      (find<Record<SelectOption>> (pipe (getId, elem_ (id))))

/**
 * Get a selection option's name with the given id from given wiki entry.
 * Returns `Nothing` if not found.
 * @param obj The entry.
 */
export const getSelectOptionName = (obj: Activatable) => pipe (findSelectOption (obj), fmap (name))

/**
 * Get a selection option's cost with the given id from given wiki entry.
 * Returns `Nothing` if not found.
 * @param obj The entry.
 */
export const getSelectOptionCost = (obj: Activatable) => pipe (findSelectOption (obj), bind_ (cost))

/**
 * Get all `ActiveObject.sid` values from the given instance.
 * @param obj The entry.
 */
export const getActiveSelections = fmap (pipe (active, mapMaybe (sid)))

type SecondarySelections = OrderedMap<number | string, List<string | number>>

/**
 * Get all `ActiveObject.sid2` values from the given instance, sorted by
 * `ActiveObject.sid` in Map.
 * @param entry
 */
export const getActiveSecondarySelections =
  fmap (
    pipe (
      active as (r: Record<ActivatableDependent>) => ActivatableDependent['active'],
      foldl<Record<ActiveObject>, SecondarySelections>
        (map => selection =>
          fromMaybe
            (map)
            (liftM2<string | number, string | number, SecondarySelections>
              (id => id2 => alter<string | number, List<string | number>>
                (pipe (
                  fmap (consF (id2)),
                  alt_ (Just (List.fromElements (id2)))
                ))
                (id)
                (map))
              (sid (selection))
              (sid2 (selection)))
        )
        (OrderedMap.empty)
    )
  )

/**
 * Get all `DependencyObject.sid` values from the given instance.
 * @param obj The entry.
 */
export const getRequiredSelections =
  fmap (
    pipe (
      dependencies,
      mapMaybe<ActivatableDependency, string | number | List<number>> (
        pipe (
          ensure<ActivatableDependency, Record<DependencyObject>> (isRecord),
          bind_ (DependencyObject.A.sid)
        )
      )
    )
  )
