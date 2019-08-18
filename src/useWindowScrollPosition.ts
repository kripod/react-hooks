import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks window scroll position.
 *
 * @returns {[number, number]} Coordinates `[x, y]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * const Example = () => {
 *   const [windowScrollX, windowScrollY] = useWindowScrollPosition();
 *   // ...
 * };
 */
export default function useWindowScrollPosition() {
  const [position, setPosition] = useState(
    canUseDOM ? [window.scrollX, window.scrollY] : [0, 0],
  );

  useEffect(
    () =>
      managedEventListener(window, 'scroll', () => {
        setPosition([window.scrollX, window.scrollY]);
      }),
    [],
  );

  return position;
}
