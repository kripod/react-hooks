import { useCallback, useEffect, useRef } from 'react';
import { EventMap } from './types';

export const canUseDOM = typeof window !== 'undefined';

export function dethunkify<T>(value: T | (() => T)) {
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
) {
  target.addEventListener(type, callback as EventListener, options);
  return () => {
    target.removeEventListener(type, callback as EventListener, options);
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useCallback((...args) => ref.current!(...args) as T, [ref]);
}

export async function checkForPermission(
  type: PermissionName,
  errorCallback: Function = () => {},
): Promise<boolean> {
  let status = false;
  if (!navigator.permissions) {
    status = true;
  } else {
    try {
      /* Permission API is still a working draft, and Typescript types for it
      are still not correct, hence 'any' type as an argument. Similar situation
      in lines where checkForPermission function is invoked. */
      const permissions = await navigator.permissions.query({ name: type });
      if (permissions.state === 'granted') {
        status = true;
      } else {
        errorCallback();
        status = false;
      }
    } catch (error) {
      return error;
    }
  }
  return status;
}
