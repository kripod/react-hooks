import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

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
