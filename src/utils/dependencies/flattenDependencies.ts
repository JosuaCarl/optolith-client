import { pipe } from 'ramda';
import { ValueBasedDependent } from '../../types/data';
import { HeroModelRecord } from '../heroData/HeroModel';
import { SkillOptionalDependency } from '../heroData/SkillOptionalDependency';
import { getHeroStateItem } from '../heroStateUtils';
import { gt, gte, inc } from '../mathUtils';
import { flattenPrerequisites } from '../prerequisites/flattenPrerequisites';
import { thrush } from '../structures/Function';
import { elem, find, foldl, isList, List, map, maximumNonNegative } from '../structures/List';
import { bind_, fmap, Maybe, Nothing, or, sum } from '../structures/Maybe';
import { isRecord, Record } from '../structures/Record';
import { isNumber } from '../typeCheckUtils';
import { Advantage } from '../wikiData/Advantage';
import { RequireActivatable } from '../wikiData/prerequisites/ActivatableRequirement';
import { WikiModelRecord } from '../wikiData/WikiModel';
import { AbilityRequirement, Activatable } from '../wikiData/wikiTypeHelpers';
import { getWikiEntry } from '../WikiUtils';

const { prerequisites } = Advantage.A
const { origin, value } = SkillOptionalDependency.A
const { id } = RequireActivatable.A

/**
 * `flattenDependencies` flattens the list of dependencies to usable values.
 * That means, optional dependencies (objects) will be evaluated and will be
 * included in the resulting list, depending on whether it has to follow the
 * optional dependency or not. The result is a plain `List` of all non-optional
 * dependencies.
 * @param wiki The full wiki.
 * @param state The current hero.
 * @param dependencies The list of dependencies to flatten.
 */
export const flattenDependencies =
  <T extends number | boolean> (wiki: WikiModelRecord) => (state: HeroModelRecord) =>
    map<T | Record<SkillOptionalDependency>, T>
      (e => isRecord (e)
        ? pipe (
                 getWikiEntry (wiki) as (id: string) => Maybe<Activatable>,
                 bind_ (pipe (
                   prerequisites,
                   flattenPrerequisites,
                   thrush (Nothing),
                   thrush (Nothing),
                   find ((r): r is AbilityRequirement =>
                     r !== 'RCP'
                     && isList (id (r))
                     && elem (origin (e)) (id (r) as List<string>))
                 )),
                 fmap (pipe (
                   id as (r: AbilityRequirement) => List<string>,
                   foldl<string, number>
                     (acc => pipe (
                       getHeroStateItem as (id: string) =>
                         (state: HeroModelRecord) => Maybe<ValueBasedDependent>,
                       thrush (state),
                       fmap (pipe (value, gte (value (e)))),
                       or,
                       x => x ? inc (acc) : acc
                     ))
                     (0),
                   gt (1),
                   x => x ? 0 : value (e)
                 )),
                 sum
               )
               (origin (e)) as T
        : e)

/**
 * Filters the list of dependencies of `ActivatableSkillDependent`s and returns
 * the maximum. Minimum: `0`.
 */
export const filterAndMaximumNonNegative =
  pipe (List.filter<number | boolean, number> (isNumber), maximumNonNegative)
