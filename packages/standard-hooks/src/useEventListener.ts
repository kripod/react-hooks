import { useEffect, useRef } from 'react';
import { canUseDOM, eventListenerEffect } from './utils';

export default function useEventListener(
  type: string,
  callback: EventListener,
  target: EventTarget | undefined = canUseDOM ? window : undefined,
  options?: boolean | AddEventListenerOptions,
) {
  // Based on the implementation of `useInterval`
  const savedCallback = useRef<typeof callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(
    target
      ? eventListenerEffect(
          target,
          type,
          event => {
            if (savedCallback.current) savedCallback.current(event);
          },
          options,
        )
      : () => {},
    [options, target, type],
  );
}
