import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks visual viewport scale.
 *
 * ⚗️ _The underlying technology is experimental. Please be aware about browser compatibility before using this in production._
 *
 * @returns Pinch-zoom scaling factor, falling back to `0` when unavailable.
 *
 * @example
 * function Component() {
 *   const viewportScale = useViewportScale();
 *   // ...
 * }
 */
export default function useViewportScale(): number {
  const [scale, setScale] = useState(
    canUseDOM ? window.visualViewport.scale : 0,
  );

  useEffect(
    () =>
      managedEventListener(window.visualViewport, 'resize', () => {
        setScale(window.visualViewport.scale);
      }),
    [],
  );

  return scale;
}
