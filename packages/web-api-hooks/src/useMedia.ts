import { useEffect, useMemo, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks match state of a media query.
 *
 * @param query Media query to parse.
 *
 * @returns `true` if the associated media query list matches the state of the [`document`](https://developer.mozilla.org/docs/Web/API/Document), or `false` otherwise.
 *
 * @example
 * function Example() {
 *   const isWidescreen = useMedia('(min-aspect-ratio: 16/9)');
 *   // ...
 * }
 */
export default function useMedia(query: string): boolean {
  const mediaQueryList = useMemo(() => canUseDOM && matchMedia(query), [query]);
  const [matches, setMatches] = useState(
    mediaQueryList && mediaQueryList.matches,
  );

  useEffect(
    () =>
      mediaQueryList
        ? managedEventListener(mediaQueryList, 'change', ((
            event: MediaQueryListEvent,
          ) => {
            setMatches(event.matches);
          }) as EventListener)
        : undefined,
    [mediaQueryList],
  );

  return matches;
}
