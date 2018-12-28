import { Maybe, Nothing } from '../structures/Maybe';
import { fromDefault, makeGetters } from '../structures/Record';

export interface IncreasableForView {
  id: string
  name: string
  value: number
  previous: Maybe<number>
}

export const IncreasableForView =
  fromDefault<IncreasableForView> ({
    id: '',
    name: '',
    value: 0,
    previous: Nothing,
  })

export const IncreasableForViewG = makeGetters (IncreasableForView)