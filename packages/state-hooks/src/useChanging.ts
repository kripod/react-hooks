import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether a value has changed over a relatively given period of time.
 *
 * @param value Props, state or any other calculated value.
 * @param {number} groupingIntervalMs Time interval, in milliseconds, to group a batch of changes by.
 * @returns `true` if the value has changed at least once over the given interval, or `false` otherwise.
 *
 * @example
 * function Component() {
 *   const scrollCoords = useWindowScrollCoords();
 *   const isScrolling = useChanging(scrollCoords);
 *   // ...
 * }
 */
export default function useChanging<T>(
  value: T,
  groupingIntervalMs = 150,
): boolean {
  const [isChanging, setChanging] = useState(false);
  const prevGroupingIntervalMsRef = useRef(0);

  useEffect(() => {
    // Prevent initial state from being true
    if (groupingIntervalMs !== prevGroupingIntervalMsRef.current) {
      prevGroupingIntervalMsRef.current = groupingIntervalMs;
    } else {
      setChanging(true);
    }

    const timeoutID = setTimeout(() => setChanging(false), groupingIntervalMs);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [groupingIntervalMs, value]);

  return isChanging;
}
