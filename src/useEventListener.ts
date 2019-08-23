import { useEffect } from 'react';
import {
  EventListenerCallback,
  managedEventListener,
  useEventCallback,
} from './utils';

/**
 * Listens to an event while the enclosing component is mounted.
 *
 * @param type Name of event (case-sensitive).
 * @param callback Method to execute whenever the event fires.
 * @param [target=window] Target to listen on, possibly a DOM element or a remote service connector.
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
export default function useEventListener<
  T extends EventTarget,
  K extends string
>(
  type: K,
  callback: EventListenerCallback<T, K>,
  target?: T,
  options?: AddEventListenerOptions,
) {
  // Based on the implementation of `useInterval`
  const savedCallback = useEventCallback(callback);

  useEffect(
    () => managedEventListener(target || window, type, savedCallback, options),
    [options, savedCallback, target, type],
  );
}
