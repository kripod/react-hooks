// TODO: Consider splitting this into `useLocalStorage` and `useSessionStorage`

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

function getLazyInstance<T>(value: T | (() => T) | null) {
  return typeof value === 'function' ? (value as () => T)() : value;
}

/**
 * Stores a key/value pair statefully.
 *
 * @see [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate), which exposes a similar interface
 *
 * @param storage Storage object, which stays intact through page loads.
 * @param key Identifier to associate the stored value with.
 * @param initialValue Value used when no item exists with the given key. Lazy initialization is available by using a function which returns the desired value.
 * @param errorCallback Method to execute in case of an error, e.g. when the storage quota has been exceeded.
 * @returns A statefully stored value, and a function to update it.
 *
 * @example
 * const Example = () => {
 *   const [name, setName] = useStorage('name', 'Anonymous');
 *   // ...
 * };
 */
export default function useStorage<T extends JSONValue>(
  storage: Storage,
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException) => void,
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] {
  return useReducer(
    (prevValue: T | null, update: React.SetStateAction<T | null>) => {
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

export function useLocalStorage<T extends JSONValue>(
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException) => void,
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] {
  /* eslint-disable react-hooks/rules-of-hooks */
  return typeof window !== 'undefined'
    ? useStorage(localStorage, key, initialValue, errorCallback)
    : useState(getLazyInstance(initialValue));
  /* eslint-enable react-hooks/rules-of-hooks */
}
