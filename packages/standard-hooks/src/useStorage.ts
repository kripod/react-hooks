import { useReducer, useState } from 'react';

export type JSONValue =
  | string
  | number
  | boolean
  | JSONArray
  | JSONObject
  | null;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JSONArray extends Array<JSONValue> {}

export interface JSONObject {
  [key: string]: JSONValue;
}

function getLazyInstance<T>(value: T | (() => T) | null | undefined) {
  return typeof value === 'function' ? (value as () => T)() : (value as T);
}

function useStorage<T extends JSONValue>(
  getStorage: () => Storage,
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException) => void,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  let storage: Storage;
  try {
    storage = getStorage();
    if (!storage)
      // Since Firefox 67, `window.localStorage` no longer throws `SecurityError` when blocked due to privacy settings
      // Source: https://www.fxsitecompat.dev/en-CA/docs/2019/window-localstorage-no-longer-throws-securityerror-when-blocked-due-to-privacy-settings/
      throw new DOMException(
        'Failed to read storage object: Access is denied for this document.',
        'SecurityError',
      );
  } catch (error) {
    if (errorCallback) errorCallback(error);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useState(getLazyInstance(initialValue));
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useReducer(
    (prevValue: T, update: React.SetStateAction<T>) => {
      const nextValue =
        typeof update === 'function' ? update(prevValue) : update;

      try {
        storage.setItem(key, JSON.stringify(nextValue));
      } catch (error) {
        if (errorCallback) errorCallback(error);
      }
      return nextValue;
    },

    key,
    initialKey => {
      const serializedValue = storage.getItem(initialKey);

      if (serializedValue != null) {
        try {
          return JSON.parse(serializedValue);
        } catch {
          // Backwards compatibility with past stored non-serialized values
          return serializedValue;
        }
      }

      return getLazyInstance(initialValue);
    },
  );
}

/**
 * Stores a key/value pair statefully in [`localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage).
 *
 * @see [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate), which exposes a similar interface
 *
 * @param key Identifier to associate the stored value with.
 * @param initialValue Value used when no item exists with the given key. Lazy initialization is available by using a function which returns the desired value.
 * @param errorCallback Method to execute in case of an error, e.g. when the storage quota has been exceeded or the user has denied permission to persist data.
 * @returns A statefully stored value, and a function to update it.
 *
 * @example
 * const Example = () => {
 *   const [visitCount, setVisitCount] = useLocalStorage<number>('visitCount', 0);
 *   useEffect(() => {
 *     setVisitCount(count => count + 1);
 *   }, []);
 *   // ...
 * };
 */
export function useLocalStorage<T extends JSONValue>(
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException) => void,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  return useStorage(() => localStorage, key, initialValue, errorCallback);
}

/**
 * Stores a key/value pair statefully in [`sessionStorage`](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage).
 *
 * @see [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate), which exposes a similar interface
 *
 * @param key Identifier to associate the stored value with.
 * @param initialValue Value used when no item exists with the given key. Lazy initialization is available by using a function which returns the desired value.
 * @param errorCallback Method to execute in case of an error, e.g. when the storage quota has been exceeded or the user has denied permission to persist data.
 * @returns A statefully stored value, and a function to update it.
 *
 * @example
 * const Example = () => {
 *   const [name, setName] = useSessionStorage<string>('name', 'Anonymous');
 *   // ...
 * };
 */
export function useSessionStorage<T extends JSONValue>(
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException) => void,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  return useStorage(() => sessionStorage, key, initialValue, errorCallback);
}
