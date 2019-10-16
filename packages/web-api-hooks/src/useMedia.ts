import { useEffect, useMemo, useState } from 'react';
import { canUseDOM } from './utils';

/**
 * Tracks match state of a media query.
 *
 * @param query Media query to parse.
 *
 * @returns `true` if the associated media query list matches the state of the [`document`](https://developer.mozilla.org/docs/Web/API/Document), or `false` otherwise.
 *
 * @example
 * function Component() {
 *   const isWidescreen = useMedia('(min-aspect-ratio: 16/9)');
 *   // ...
 * }
 */
export default function useMedia(query: string): boolean {
  const mediaQueryList = useMemo(() => canUseDOM && matchMedia(query), [query]);
  const [matches, setMatches] = useState(
    mediaQueryList && mediaQueryList.matches,
  );

  useEffect(() => {
    if (!mediaQueryList) return undefined;

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    // TODO: Refactor to `managedEventListener` when `change` event is supported
    mediaQueryList.addListener(handleChange);
    return () => {
      mediaQueryList.removeListener(handleChange);
    };
  }, [mediaQueryList]);

  return matches;
}
