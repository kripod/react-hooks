// TODO: Consider splitting this into `useLocalStorage` and `useSessionStorage`

import { useReducer } from 'react';
import { Nullable } from './utils';

export type JSONProperty =
  | string
  | number
  | boolean
  | JSONArray
  | JSONObject
  | null;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JSONArray extends Array<JSONProperty> {}

export interface JSONObject {
  [key: string]: JSONProperty;
}

function getLazyInstance<T>(value: Nullable<T | (() => T)>) {
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
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} A statefully stored value, and a function to update it.
 *
 * @example
 * const Example = () => {
 *   const [name, setName] = useStorage('name', 'Anonymous');
 *   // ...
 * };
 */
export default function useStorage<T>(
  storage: Storage,
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException) => void,
) {
  type V = Extract<T, JSONProperty>;

  return useReducer(
    (prevValue: V, update: React.SetStateAction<V>) => {
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
