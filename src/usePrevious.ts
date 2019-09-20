import { useEffect, useRef } from 'react';

/**
 * Tracks previous state of a value.
 *
 * @param value Props, state or any other calculated value.
 * @returns Value from the previous render of the enclosing component.
 *
 * @example
 * function Example() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *   // ...
 *   return `Now: ${count}, before: ${prevCount}`;
 * }
 */
export default function usePrevious<T>(value: T): T {
  // Source: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
}
