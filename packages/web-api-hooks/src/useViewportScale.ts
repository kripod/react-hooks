import { useEffect, useState } from 'react';

import { canUseVisualViewport, managedEventListener } from './utils';

/**
 * Tracks visual viewport scale.
 *
 * ⚗️ _The underlying technology is experimental. Please be aware about browser compatibility before using this in production._
 *
 * @returns Pinch-zoom scaling factor, falling back to `1.0` when unavailable.
 *
 * @example
 * function Component() {
 *   const viewportScale = useViewportScale();
 *   // ...
 * }
 */
export default function useViewportScale(): number {
  const [scale, setScale] = useState(
    canUseVisualViewport ? window.visualViewport.scale : 1.0,
  );

  useEffect(() => {
    if (!canUseVisualViewport) {
      return;
    }

    managedEventListener(window.visualViewport, 'resize', () => {
      setScale(window.visualViewport.scale);
    });
  }, []);

  return scale;
}
