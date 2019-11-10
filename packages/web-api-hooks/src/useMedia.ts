import { useEffect, useState } from 'react';
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
  const [matches, setMatches] = useState(() =>
    canUseDOM ? matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mediaQueryList = matchMedia(query);

    function handleChange(): void {
      setMatches(mediaQueryList.matches);
    }

    // Handle `query` param changes immediately
    handleChange();

    // TODO: Refactor to `managedEventListener` when `change` event is supported
    mediaQueryList.addListener(handleChange);
    return (): void => {
      mediaQueryList.removeListener(handleChange);
    };
  }, [query]);

  return matches;
}
