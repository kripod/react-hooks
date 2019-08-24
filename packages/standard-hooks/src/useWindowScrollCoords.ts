import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks window scroll position.
 *
 * @returns Coordinates `[x, y]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * const Example = () => {
 *   const [windowScrollX, windowScrollY] = useWindowScrollCoords();
 *   // ...
 * };
 */
export default function useWindowScrollCoords(): Readonly<[number, number]> {
  const [coords, setCoords] = useState<Readonly<[number, number]>>(
    canUseDOM ? [window.pageXOffset, window.pageYOffset] : [0, 0],
  );

  useEffect(
    () =>
      managedEventListener(window, 'scroll', () => {
        setCoords([window.pageXOffset, window.pageYOffset]);
      }),
    [],
  );

  return coords;
}
