import { useReducer } from 'react';

export default function useStorage(
  key: string,
  storage = localStorage,
  errorCallback?: (error: DOMException) => void,
) {
  return useReducer(
    (_, value) => {
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
    storage.getItem,
  );
}
