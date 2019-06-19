import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

type StandardVisibilityState = Exclude<VisibilityState, 'prerender'>;

/**
 * Tracks visibility of the page.
 *
 * @returns {VisibilityState} Visibility state of the `document`, which is `'visible'` by default.
 * @see [`Document.visibilityState`](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)
 *
 * @example
 * const Example = () => {
 *   const documentVisibility = useDocumentVisibility();
 *   if (documentVisibility === 'hidden') {
 *     // ...
 *   }
 * };
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
