import { useEffect, useState } from 'react';

/**
 * Tracks size of an element.
 *
 * ⚗️ _The underlying technology is experimental. Please be aware about browser compatibility before using this in production._
 *
 * @param ref Attribute attached to the element under observation.
 * @param {TypeOf<ResizeObserver>} ResizeObserverOverride Replacement for `window.ResizeObserver`, e.g. [a polyfill](https://github.com/juggle/resize-observer).
 *
 * @returns Dimensions `[width, height]`, falling back to `[0, 0]` when unavailable.
 *
 * @example
 * function Component() {
 *   const ref = useRef<HTMLElement>(null);
 *   const [width, height] = useSize(ref);
 *   // ...
 *   return <ElementToObserve ref={ref} />;
 * }
 */
export default function useSize(
  ref: React.RefObject<HTMLElement>,
  ResizeObserverOverride?: typeof ResizeObserver,
): Readonly<[number, number]> {
  const [size, setSize] = useState<Readonly<[number, number]>>([0, 0]);

  useEffect(() => {
    const ResizeObserver = ResizeObserverOverride || window.ResizeObserver;
    if (!ResizeObserver || !ref.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize([width, height]);
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ResizeObserverOverride, ref]);

  return size;
}
