import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

/**
 * Tracks media query match state.
 *
 * @param query media query string for evalution
 *
 * @returns {boolean} isMatch
 *
 * @example
 * function Example() {
 *   const isWidescreen = useMedia('(min-width: 400px)');
 *   // ...
 * }
 */
export default function useMedia(query: string): boolean {
  const [isMatch, setIsMatch] = useState<boolean>(
    window.matchMedia(query).matches,
  );

  useEffect(
    () =>
      managedEventListener(window, 'resize', () => {
        setIsMatch(window.matchMedia(query).matches);
      }),
    [query],
  );

  return isMatch;
}
