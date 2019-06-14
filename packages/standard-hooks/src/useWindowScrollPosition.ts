import { useEffect, useState } from 'react';
import useSmoothAnimation from './useSmoothAnimation';
import { canUseDOM, eventListenerEffect } from './utils';

export default function useWindowScrollPosition() {
  const [position, setPosition] = useState(
    canUseDOM ? [window.scrollX, window.scrollY] : [0, 0],
  );

  useEffect(
    eventListenerEffect(
      window,
      'scroll',
      useSmoothAnimation(() => {
        setPosition([window.scrollX, window.scrollY]);
      }),
    ),
    [],
  );

  return position;
}
