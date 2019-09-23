import { useEffect, useState } from 'react';
import { JSONValue } from './types';
import { getLazyValue } from './utils';

export function canAccessStorage(getStorage: () => Storage) {
  try {
    // Check if the storage object is defined and available
    // Prior to Firefox 70, localStorage may be null
    if (getStorage()) return true;
    // eslint-disable-next-line no-empty
  } catch {}
  return false;
}

export default function useStorage<T extends JSONValue>(
  storage: Storage,
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException | TypeError) => void,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const serializedValue = storage.getItem(key);
    if (serializedValue != null) {
      try {
        return JSON.parse(serializedValue);
      } catch {
        // Backwards compatibility with past stored non-serialized values
        return serializedValue;
      }
    }
    return getLazyValue(initialValue);
  });

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (errorCallback) errorCallback(error);
    }
  }, [errorCallback, key, storage, value]);

  return [value, setValue];
}
