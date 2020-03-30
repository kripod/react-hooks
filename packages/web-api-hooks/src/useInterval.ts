import { useEffect } from 'react';

import { managedInterval, useEventCallback } from './utils';

/**
 * Repeatedly calls a function with a fixed time delay between each call.
 *
 * 📝 _Timings may be inherently inaccurate, due to the implementation of [`setInterval`](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) under the hood._
 *
 * @param callback Method to execute periodically.
 * @param delayMs Time, in milliseconds, to wait between executions of the specified function. Set to `null` for pausing.
 *
 * @example
 * function Component() {
 *   useInterval(() => {
 *     // Custom logic to execute each second
 *   }, 1000);
 *   // ...
 * }
 */
export default function useInterval(
  callback: () => void,
  delayMs: number | null,
): void {
  // Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const savedCallback = useEventCallback(callback);

  useEffect(
    () =>
      delayMs != null ? managedInterval(savedCallback, delayMs) : undefined,
    [delayMs, savedCallback],
  );
}
