import { useEffect } from 'react';
import { managedEventListener, useEventCallback } from './utils';

export default function useEventListener(
  type: string,
  callback: EventListener,
  target: EventTarget = globalThis,
  options?: boolean | AddEventListenerOptions,
) {
  // Based on the implementation of `useInterval`
  const savedCallback = useEventCallback(callback);

  useEffect(() => managedEventListener(target, type, savedCallback, options), [
    options,
    savedCallback,
    target,
    type,
  ]);
}
