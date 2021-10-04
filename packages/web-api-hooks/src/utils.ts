import { useCallback, useEffect, useRef } from 'react';

import { EventMap } from './types';

export const canUseDOM = typeof window !== 'undefined';

export const canUseVisualViewport = canUseDOM && 'visualViewport' in window;

export function dethunkify<T>(value: T | (() => T)): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

export function managedEventListener<
  T extends EventTarget,
  K extends keyof EventMap<T> & string
>(
  target: T,
  type: K,
  callback: (event: EventMap<T>[K]) => void,
  options?: AddEventListenerOptions,
): () => void {
  target.addEventListener(type, callback as EventListener, options);
  return (): void => {
    target.removeEventListener(type, callback as EventListener, options);
  };
}

export function managedInterval(
  callback: () => void,
  delayMs: number,
): () => void {
  const id = setInterval(callback, delayMs);
  return (): void => {
    clearInterval(id);
  };
}

export function useEventCallback<T extends Function>(
  callback: T,
): (...args: unknown[]) => T {
  // Source: https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useCallback((...args): T => ref.current!(...args), [ref]);
}
