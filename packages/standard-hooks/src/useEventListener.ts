import { useEffect } from 'react';
import { managedEventListener, useEventCallback } from './utils';

/**
 * Listens to an event while the enclosing component is mounted.
 *
 * ⚠️ Due to concerns about performance, using this hook is not advised unless event listener creation parameters may vary.
 *
 * @param type Name of event (case-sensitive).
 * @param callback Method to execute whenever the event fires.
 * @param target Target to listen on, possibly an element or a remote API service.
 * @param options Additional listener characteristics.
 *
 * @example
 * const Example = () => {
 *   useEventListener('error', () => {
 *     console.log('A resource failed to load.');
 *   });
 *   // ...
 * };
 *
 * @see [Event reference on MDN](https://developer.mozilla.org/en-US/docs/Web/Events)
 */
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
