import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks visual viewport scroll position.
 *
 * ⚗️ _The underlying technology is experimental. Please be aware about browser compatibility before using this in production._
 *
 * @returns Coordinates `[x, y]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * function Component() {
 *   const [viewportScrollX, viewportScrollY] = useViewportScrollCoords();
 *   // ...
 * }
 */
export default function useViewportScrollCoords(): readonly [number, number] {
  const [coords, setCoords] = useState<readonly [number, number]>(
    canUseDOM
      ? [window.visualViewport.pageLeft, window.visualViewport.pageTop]
      : [0, 0],
  );

  useEffect(
    () =>
      managedEventListener(window.visualViewport, 'scroll', () => {
        setCoords([
          window.visualViewport.pageLeft,
          window.visualViewport.pageTop,
        ]);
      }),
    [],
  );

  return coords;
}
