import { useEffect, useState } from 'react';

import { canUseDOM, managedEventListener } from './utils';

function getPreferredLanguages(): ReadonlyArray<string> {
  return navigator.languages || [navigator.language];
}

/**
 * Tracks language preferences of the user.
 *
 * @returns An array of [BCP 47](https://tools.ietf.org/html/bcp47) language tags, ordered by preference with the most preferred language first.
 *
 * @example
 * function Component() {
 *   const preferredLanguages = useLanguagePreferences();
 *   // ...
 * }
 */
export default function useLanguagePreferences(): ReadonlyArray<string> {
  const [languages, setLanguages] = useState(
    canUseDOM ? getPreferredLanguages() : ['en-US', 'en'],
  );

  useEffect(
    () =>
      managedEventListener(window, 'languagechange', () => {
        setLanguages(getPreferredLanguages());
      }),
    [],
  );

  return languages;
}
