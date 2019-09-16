import { useEffect, useRef } from 'react';

/**
 * Executes a callback before first render of a component
 *
 * @param callback Method to execute.
 *
 * @example
 * function Example() {
 *   useBeforeFirstRender(() => {
 *     // Custom logic to execute each second
 *   });
 *   // ...
 * }
 */

export default function useBeforeFirstRender(callback: () => void) {
  const hasRendered = useRef(false);

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  if (!hasRendered.current) {
    callback();
  }
}
