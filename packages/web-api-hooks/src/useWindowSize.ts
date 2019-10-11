import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks window size.
 *
 * @returns Dimensions `[width, height]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * function Example() {
 *   const [windowWidth, windowHeight] = useWindowSize();
 *   // ...
 * }
 */
export default function useWindowSize(): Readonly<[number, number]> {
  const [size, setSize] = useState<Readonly<[number, number]>>(
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
