import { useReducer } from 'react';

export default function useStorage(
  key: string,
  defaultValue: string | null = null,
  storage = localStorage,
  errorCallback?: (error: DOMException) => void,
) {
  return useReducer(
    (_, value: string | null) => {
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
