import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

/**
 * Tracks mouse position.
 *
 * @returns Coordinates `[x, y]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * function Component() {
 *   const [mouseX, mouseY] = useMouseCoords();
 *   // ...
 * }
 */
export default function useMouseCoords(): readonly [number, number] {
  const [coords, setCoords] = useState<readonly [number, number]>([0, 0]);

  useEffect(
    () =>
      managedEventListener(window, 'mousemove', event => {
        setCoords([event.clientX, event.clientY]);
      }),
    [],
  );

  return coords;
}
