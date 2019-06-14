import { useState } from 'react';
import useEventListener from './useEventListener';
import useSmoothAnimation from './useSmoothAnimation';
import { canUseDOM } from './utils';

export default function useWindowSize() {
  const [size, setSize] = useState(
    canUseDOM ? [window.innerWidth, window.innerHeight] : [0, 0],
  );

  useEventListener(
    'resize',
    useSmoothAnimation(() => {
      setSize([window.innerWidth, window.innerHeight]);
    }),
  );

  return size;
}
