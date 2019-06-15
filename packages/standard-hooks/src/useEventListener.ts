import { useEffect, useRef } from 'react';
import { managedEventListener } from './utils';

export default function useEventListener(
  type: string,
  callback: EventListener,
  target: EventTarget = globalThis,
  options?: boolean | AddEventListenerOptions,
) {
  // Based on the implementation of `useInterval`
  const savedCallback = useRef<typeof callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(
    () =>
      managedEventListener(
        target,
        type,
        event => {
          (savedCallback.current as EventListener)(event);
        },
        options,
      ),
    [options, target, type],
  );
}
