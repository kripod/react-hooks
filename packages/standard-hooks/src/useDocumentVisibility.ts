import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

type StandardVisibilityState = Exclude<VisibilityState, 'prerender'>;

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
