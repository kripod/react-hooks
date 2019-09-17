import { useEffect, useState, useRef } from 'react';
import { canUseDOM, mockMediaQueryList } from './utils';

/**
 * Tracks match state of a media query.
 *
 * @param query Media query to parse.
 *
 * @returns {boolean} `true` if the associated media query list matches the state of the [`document`](https://developer.mozilla.org/docs/Web/API/Document), or `false` otherwise.
 *
 * @example
 * function Example() {
 *   const isWidescreen = useMedia('(min-aspect-ratio: 16/9)');
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
