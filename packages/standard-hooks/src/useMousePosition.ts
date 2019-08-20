import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

/**
 * Tracks mouse position.
 *
 * @returns Coordinates `[x, y]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * const Example = () => {
 *   const [mouseX, mouseY] = useMousePosition();
 *   // ...
 * };
 */
export default function useMousePosition(): Readonly<[number, number]> {
  const [position, setPosition] = useState<Readonly<[number, number]>>([0, 0]);

  useEffect(
    () =>
      managedEventListener(window, 'mousemove', ((event: MouseEvent) => {
        setPosition([event.clientX, event.clientY]);
      }) as EventListener),
    [],
  );

  return position;
}
