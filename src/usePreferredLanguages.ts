import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

function getPreferredLanguages() {
  return navigator.languages || [navigator.language];
}

/**
 * Tracks preferred languages of the user.
 *
 * @param defaultValue Fallback value used when preferences are unavailable.
 * @returns {string[]} An array of [BCP 47](https://tools.ietf.org/html/bcp47) language tags, ordered by preference with the most preferred language first.
 *
 * @example
 * const Example = () => {
 *   const preferredLanguages = usePreferredLanguages();
 *   // ...
 * };
 */
export default function usePreferredLanguages(defaultValue = ['en-US']) {
  const [languages, setLanguages] = useState(
    canUseDOM ? getPreferredLanguages() : defaultValue,
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
