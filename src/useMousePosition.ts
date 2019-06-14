import { useEffect, useState } from 'react';
import { eventListenerEffect } from './utils';

export default function useMousePosition() {
  const [position, setPosition] = useState([0, 0]);

  useEffect(
    () =>
      eventListenerEffect(window, 'mousemove', ((event: MouseEvent) => {
        setPosition([event.clientX, event.clientY]);
      }) as EventListener),
    [],
  );

  return position;
}
