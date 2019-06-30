import { useEffect } from 'react';
import { managedEventListener, useEventCallback } from './utils';

/**
 * Listens to an event while the enclosing component is mounted.
 *
 * ⚠️ Due to concerns about performance, using this hook is not advised unless event listener creation parameters may vary.
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
export default function useEventListener(
  type: string,
  callback: EventListener,
  target?: EventTarget,
  options?: AddEventListenerOptions,
) {
  // Based on the implementation of `useInterval`
  const savedCallback = useEventCallback(callback);

  useEffect(
    () => managedEventListener(target || window, type, savedCallback, options),
    [options, savedCallback, target, type],
  );
}
