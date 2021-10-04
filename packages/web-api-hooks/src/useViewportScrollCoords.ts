import { useEffect, useState } from 'react';

import { canUseVisualViewport, managedEventListener } from './utils';

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
export default function useViewportScrollCoords(): Readonly<[number, number]> {
  const [coords, setCoords] = useState<Readonly<[number, number]>>(
    canUseVisualViewport
      ? [window.visualViewport.pageLeft, window.visualViewport.pageTop]
      : [0, 0],
  );

  useEffect(() => {
    if (!canUseVisualViewport) {
      return;
    }

    function handler(): void {
      setCoords([
        window.visualViewport.pageLeft,
        window.visualViewport.pageTop,
      ]);
    }

    managedEventListener(window?.visualViewport, 'scroll', handler);
    managedEventListener(window?.visualViewport, 'resize', handler);
  }, []);

  return coords;
}
