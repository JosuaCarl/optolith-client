import { ActivatableSkillDependent } from '../activeEntries/ActivatableSkillDependent';
import { fromDefault, makeGetters, Record } from '../structures/Record';
import { Spell } from '../wikiData/Spell';

export interface SpellCombined {
  wikiEntry: Record<Spell>
  stateEntry: Record<ActivatableSkillDependent>
}

const SpellCombined =
  fromDefault<SpellCombined> ({
    wikiEntry: Spell .default,
    stateEntry: ActivatableSkillDependent .default,
  })

export const SpellCombinedG = makeGetters (SpellCombined)