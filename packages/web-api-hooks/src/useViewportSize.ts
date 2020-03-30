import { useEffect, useState } from 'react';

import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks visual viewport size.
 *
 * ⚗️ _The underlying technology is experimental. Please be aware about browser compatibility before using this in production._
 *
 * @returns Dimensions `[width, height]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * function Component() {
 *   const [viewportWidth, viewportHeight] = useViewportSize();
 *   // ...
 * }
 */
export default function useViewportSize(): readonly [number, number] {
  const [size, setSize] = useState<readonly [number, number]>(
    canUseDOM
      ? [window.visualViewport.width, window.visualViewport.height]
      : [0, 0],
  );

  useEffect(
    () =>
      managedEventListener(window.visualViewport, 'resize', () => {
        setSize([window.visualViewport.width, window.visualViewport.height]);
      }),
    [],
  );

  return size;
}
