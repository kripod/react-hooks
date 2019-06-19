import { useCallback, useEffect, useRef } from 'react';

export const canUseDOM = typeof window !== 'undefined';

export function managedEventListener(
  target: EventTarget,
  type: string,
  callback: EventListener,
  options?: boolean | AddEventListenerOptions,
) {
  target.addEventListener(type, callback, options);
  return () => {
    target.removeEventListener(type, callback, options);
  };
}

export function managedInterval(callback: () => void, delayMs: number) {
  const id = setInterval(callback, delayMs);
  return () => {
    clearInterval(id);
  };
}

export function useEventCallback<T extends Function>(callback: T) {
  // Source: https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return (useCallback((...args) => (ref.current as T)(...args), [
    ref,
  ]) as unknown) as T;
}
