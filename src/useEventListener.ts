import { useEffect } from 'react';
import { EventMap } from './types';
import { managedEventListener, useEventCallback } from './utils';

/**
 * Listens to an event while the enclosing component is mounted.
 *
 * @see [Event reference on MDN](https://developer.mozilla.org/en-US/docs/Web/Events)
 *
 * @param {EventTarget} target Target to listen on, possibly a DOM element or a remote service connector.
 * @param {string} type Name of event (case-sensitive).
 * @param {EventListener} callback Method to execute whenever the event fires.
 * @param options Additional listener characteristics.
 *
 * @example
 * const Example = () => {
 *   useEventListener(window, 'error', () => {
 *     console.log('A resource failed to load.');
 *   });
 *   // ...
 * };
 */
export default function useEventListener<
  T extends EventTarget,
  K extends keyof EventMap<T> & string
>(
  target: T,
  type: K,
  callback: (event: EventMap<T>[K]) => void,
  options?: AddEventListenerOptions,
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
