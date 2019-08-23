import { useReducer } from 'react';

type JSONProperty = string | number | boolean | JSONArray | JSONObject | null;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface JSONArray extends Array<JSONProperty> {}

interface JSONObject {
  [key: string]: JSONProperty;
}

/**
 * Stores a key/value pair statefully.
 *
 * @param key Identifier to associate the stored value with.
 * @param defaultValue Value used when no item exists with the given key.
 * @param storage Storage object, which stays intact through page loads.
 * @param errorCallback Method to execute in case of an error, e.g. when the storage quota has been exceeded.
 * @returns {[D, React.Dispatch<React.SetStateAction<D>>]} A statefully stored value, and a function to update it. Update value to `null` for removal from the storage object and resetting it to `defaultValue`.
 *
 * @example
 * const Example = () => {
 *   const [name, setName] = useStorage('name', 'Anonymous');
 *   // ...
 * };
 *
 * @see [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate), which exposes a similar interface
 */
export default function useStorage<D>(
  key: string,
  defaultValue: D | null = null,
  storage = localStorage,
  errorCallback?: (error: DOMException) => void,
) {
  type V = Extract<D | null, JSONProperty>;

  return useReducer<React.Reducer<V, React.SetStateAction<V>>, typeof key>(
    (prevValue, update) => {
      const nextValue =
        typeof update === 'function' ? update(prevValue) : update;

      if (nextValue == null) {
        storage.removeItem(key);
        return defaultValue as V;
      }

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
      return serializedValue != null
        ? JSON.parse(serializedValue)
        : defaultValue;
    },
  );
}
