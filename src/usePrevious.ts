import { useEffect, useRef } from 'react';

/**
 * Tracks previous state of a value.
 *
 * @param value Props, state or any other calculated value.
 * @returns Value from the previous render of the enclosing component.
 */
export default function usePrevious<T>(value: T): T {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
}
