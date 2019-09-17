import { useState, useEffect, useRef } from 'react';
import { canUseDOM, managedEventListener } from './utils';

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
  const mediaQueryListRef = useRef(canUseDOM && matchMedia(query));

  const [matches, setMatches] = useState(
    mediaQueryListRef.current && mediaQueryListRef.current.matches,
  );

  useEffect(() =>
    mediaQueryListRef.current
      ? managedEventListener(mediaQueryListRef.current, 'change', ((
          event: MediaQueryListEvent,
        ) => {
          setMatches(event.matches);
        }) as EventListener)
      : undefined,
  );

  return matches;
}
