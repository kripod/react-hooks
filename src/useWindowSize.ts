import { useEffect, useState } from 'react';
import useSmoothAnimation from './useSmoothAnimation';
import { canUseDOM, eventListenerEffect } from './utils';

export default function useWindowSize() {
  const [size, setSize] = useState(
    canUseDOM ? [window.innerWidth, window.innerHeight] : [0, 0],
  );

  useEffect(
    eventListenerEffect(
      window,
      'resize',
      useSmoothAnimation(() => {
        setSize([window.innerWidth, window.innerHeight]);
      }),
    ),
    [],
  );

  return size;
}
