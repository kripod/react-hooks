import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

/**
 * Tracks mouse position.
 *
 * @returns Coordinates `[x, y]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * const Example = () => {
 *   const [mouseX, mouseY] = useMouseCoords();
 *   // ...
 * };
 */
export default function useMouseCoords(): Readonly<[number, number]> {
  const [coords, setCoords] = useState<Readonly<[number, number]>>([0, 0]);

  useEffect(
    () =>
      managedEventListener(window, 'mousemove', event => {
        setCoords([event.clientX, event.clientY]);
      }),
    [],
  );

  return coords;
}
