import { useEffect } from 'react';
import { managedInterval, useEventCallback } from './utils';

export default function useInterval(
  callback: () => void,
  delayMs: number | null,
) {
  // Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const savedCallback = useEventCallback(callback);

  useEffect(
    () =>
      delayMs != null ? managedInterval(savedCallback, delayMs) : () => {},
    [delayMs, savedCallback],
  );
}
