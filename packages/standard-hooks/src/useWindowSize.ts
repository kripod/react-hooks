import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener, smoothAnimation } from './utils';

export default function useWindowSize() {
  const [size, setSize] = useState(
    canUseDOM ? [window.innerWidth, window.innerHeight] : [0, 0],
  );

  useEffect(
    () =>
      managedEventListener(
        window,
        'resize',
        smoothAnimation(() => {
          setSize([window.innerWidth, window.innerHeight]);
        }),
      ),
    [],
  );

  return size;
}
