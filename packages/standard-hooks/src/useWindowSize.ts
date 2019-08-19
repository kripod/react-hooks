import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks window size.
 *
 * @returns {[number, number]} Dimensions `[width, height]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * const Example = () => {
 *   const [windowWidth, windowHeight] = useWindowSize();
 *   // ...
 * };
 */
export default function useWindowSize() {
  const [size, setSize] = useState<[number, number]>(
    canUseDOM ? [window.innerWidth, window.innerHeight] : [0, 0],
  );

  useEffect(
    () =>
      managedEventListener(window, 'resize', () => {
        setSize([window.innerWidth, window.innerHeight]);
      }),
    [],
  );

  return size;
}
