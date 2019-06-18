import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

function getPreferredLanguages() {
  return navigator.languages || [navigator.language];
}

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
