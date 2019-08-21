import { useReducer } from 'react';

/**
 * Stores a key/value pair statefully.
 *
 * @param key Identifier to associate the stored value with.
 * @param defaultValue Value used when no item exists with the given key.
 * @param storage Storage object, which stays intact through page loads.
 * @param errorCallback Method to execute in case of an error, e.g. when the storage quota has been exceeded.
 * @returns A statefully stored value, and a function to update it. Update value to `null` for removal from the storage object.
 *
 * @example
 * const Example = () => {
 *   const [name, setName] = useStorage('name', 'Anonymous');
 *   // ...
 * };
 *
 * @see [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate), which exposes a similar interface
 */
export default function useStorage(
  key: string,
  defaultValue: string | null = null,
  storage = localStorage,
  errorCallback?: (error: DOMException) => void,
): [string | null, (value: React.SetStateAction<string | null>) => void] {
  return useReducer(
    (prevValue: string | null, update: React.SetStateAction<string | null>) => {
      const value = typeof update === 'function' ? update(prevValue) : update;
      if (value != null) {
        try {
          storage.setItem(key, value);
        } catch (error) {
          if (errorCallback) errorCallback(error);
        }
      } else {
        storage.removeItem(key);
      }
      return value;
    },
    key,
    initialKey => {
      const value = storage.getItem(initialKey);
      return value != null ? value : defaultValue; // TODO: value ?? defaultValue
    },
  );
}
