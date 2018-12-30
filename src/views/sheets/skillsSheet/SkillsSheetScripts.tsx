import * as React from 'react';
import { TextBox } from '../../../components/TextBox';
import { ActivatableDependent, ActiveObject } from '../../../types/data';
import { getSelectOptionName } from '../../../utils/activatable/selectionUtils';
import { List, Maybe, Record } from '../../../utils/dataUtils';
import { sortStrings } from '../../../utils/FilterSortUtils';
import { translate, UIMessagesObject } from '../../../utils/I18n';
import { SpecialAbility } from '../../../utils/wikiData/wikiTypeHelpers';

export interface SkillsSheetScriptsProps {
  locale: UIMessagesObject;
  scriptsStateEntry: Maybe<Record<ActivatableDependent>>;
  scriptsWikiEntry: Maybe<Record<SpecialAbility>>;
}

export function SkillsSheetScripts (props: SkillsSheetScriptsProps) {
  const {
    locale,
    scriptsStateEntry: maybeScriptsStateEntry,
    scriptsWikiEntry: maybeScriptsWikiEntry,
  } = props;

  const scripts =
    sortStrings
      (locale .get ('id'))
      (
        Maybe.mapMaybe<Record<ActiveObject>, string>
          (activeObject => maybeScriptsWikiEntry .bind (
            wikiEntry => getSelectOptionName (wikiEntry, activeObject .lookup ('sid'))
          ))
          (Maybe.fromMaybe (List.empty<Record<ActiveObject>> ())
                           (maybeScriptsStateEntry
                             .fmap (stateEntry => stateEntry .get ('active'))))
      );

  return (
    <TextBox label={translate (locale, 'charactersheet.gamestats.knownscripts.title')}>
      <div className="scripts-list">
        {scripts.intercalate (', ')}
      </div>
    </TextBox>
  );
}
