import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

function getPreferredLanguages() {
  return navigator.languages || [navigator.language];
}

// TODO: Use `readonly string[]` instead of `ReadonlyArray<string>`

/**
 * Tracks preferred languages of the user.
 *
 * @returns An array of [BCP 47](https://tools.ietf.org/html/bcp47) language tags, ordered by preference with the most preferred language first.
 *
 * @example
 * const Example = () => {
 *   const preferredLanguages = usePreferredLanguages();
 *   // ...
 * };
 */
export default function usePreferredLanguages(): ReadonlyArray<string> {
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
