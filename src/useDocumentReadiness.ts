import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks readiness of the current document.
 *
 * @returns {DocumentReadyState} (Defaults to `'loading'`.)
 * @see https://developer.mozilla.org/docs/Web/API/Document/readyState
 *
 * @example
 * const Example = () => {
 *   const documentReadiness = useDocumentReadiness();
 *   if (documentReadiness === 'interactive') {
 *     // ...
 *   }
 * };
 */
export default function useDocumentReadiness() {
  const [readiness, setReadiness] = useState(
    canUseDOM ? document.readyState : 'loading',
  );

  useEffect(
    () =>
      managedEventListener(document, 'readystatechange', () => {
        setReadiness(document.readyState);
      }),
    [],
  );

  return readiness;
}
