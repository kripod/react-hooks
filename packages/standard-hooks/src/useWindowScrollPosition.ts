import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks window scroll position.
 *
 * @returns Coordinates `[x, y]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * const Example = () => {
 *   const [windowScrollX, windowScrollY] = useWindowScrollPosition();
 *   // ...
 * };
 */
export default function useWindowScrollPosition(): Readonly<[number, number]> {
  const [position, setPosition] = useState<Readonly<[number, number]>>(
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
