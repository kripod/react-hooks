import { useEffect, useState, useRef } from 'react';
import { canUseDOM, mockMediaQueryList } from './utils';

/**
 * Tracks media query match state.
 *
 * @param query media query string for evaluation
 *
 * @returns {boolean} isMatch
 *
 * @example
 * function Example() {
 *   const isWidescreen = useMedia('(min-width: 400px)');
 *   // ...
 * }
 */
export default function useMedia(query: string): boolean {
  const queryListRef = useRef<MediaQueryList>(
    canUseDOM ? window.matchMedia(query) : mockMediaQueryList,
  );
  const [isMatch, setIsMatch] = useState<boolean>(
    () => queryListRef.current.matches,
  );

  useEffect(() => {
    const queryList = queryListRef.current;
    const handler = () => {
      setIsMatch(window.matchMedia(query).matches);
    };

    queryList.addListener(handler);
    return () => {
      queryList.removeListener(handler);
    };
  }, [query]);

  return isMatch;
}
