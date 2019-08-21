import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

type StandardVisibilityState = Exclude<VisibilityState, 'prerender'>;

/**
 * Tracks visibility of the page.
 *
 * @returns Visibility state of the [`document`](https://developer.mozilla.org/docs/Web/API/Document), which is `'visible'` by default.
 *
 * @example
 * const Example = () => {
 *   const documentVisibility = useDocumentVisibility();
 *   if (documentVisibility === 'hidden') {
 *     // ...
 *   }
 * };
 */
export default function useDocumentVisibility(): StandardVisibilityState {
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
