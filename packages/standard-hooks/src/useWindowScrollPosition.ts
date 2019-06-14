import { useState } from 'react';
import useEventListener from './useEventListener';
import useSmoothAnimation from './useSmoothAnimation';
import { canUseDOM } from './utils';

export default function useWindowScrollPosition() {
  const [position, setPosition] = useState(
    canUseDOM ? [window.scrollX, window.scrollY] : [0, 0],
  );

  useEventListener(
    'scroll',
    useSmoothAnimation(() => {
      setPosition([window.scrollX, window.scrollY]);
    }),
  );

  return position;
}
