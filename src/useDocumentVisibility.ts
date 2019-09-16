import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

type StandardVisibilityState = Exclude<VisibilityState, 'prerender'>;

/**
 * Tracks visibility of the page.
 *
 * @returns {VisibilityState} Visibility state of the [`document`](https://developer.mozilla.org/docs/Web/API/Document), which is `'visible'` by default.
 *
 * @example
 * function Example() {
 *   const documentVisibility = useDocumentVisibility();
 *   if (documentVisibility === 'hidden') {
 *     // Reduce resource utilization to aid background page performance
 *   }
 *   // ...
 * }
 */
export default function useDocumentVisibility() {
  const [visibility, setVisibility] = useState(
    canUseDOM
      ? (document.visibilityState as StandardVisibilityState)
      : 'visible', // TODO: Consider using 'prerender'
  );

  useEffect(
    () =>
      managedEventListener(document, 'visibilitychange', () => {
        setVisibility(document.visibilityState as StandardVisibilityState);
      }),
    [],
  );

  return visibility;
}
