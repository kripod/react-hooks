import { useEffect, useRef, Ref } from 'react';

/**
 * Tracks mounted state of component.
 *
 * @returns {Ref<boolean>} `{current: isMounted}`
 *
 * @example
 * function Example() {
 *   const { current: isMounted } = useMounted();
 *   // ...
 * }
 */
export default function useMounted(): Ref<boolean> {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
