import { useReducer } from 'react';

export default function useStorage(key: string, storage = localStorage) {
  return useReducer(
    (_, value) => {
      if (value != null) {
        storage.setItem(key, value);
      } else {
        storage.removeItem(key);
      }
      return value;
    },
    key,
    storage.getItem,
  );
}
