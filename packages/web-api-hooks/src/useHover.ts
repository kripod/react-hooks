import { useState } from 'react';

/**
 * Tracks hover state of an element.
 *
 * @param {boolean} disallowTouch Determines whether touch gestures should be ignored.
 * @returns Whether the element is hovered, and props to be spread over the element under observation.
 *
 * @example
 * function Component() {
 *   const [isHovered, bindHover] = useHover();
 *   // ...
 *   return <ElementToObserve {...bindHover} />;
 * }
 */
export default function useHover(
  disallowTouch = false,
): [
  boolean,
  Readonly<{
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
  }>,
] {
  const [isHovered, setHovered] = useState(false);

  return [
    isHovered,
    {
      onMouseEnter() {
        setHovered(true);
      },
      onMouseLeave() {
        setHovered(false);
      },

      onTouchStart() {
        setHovered(!disallowTouch);
      },
      onTouchEnd() {
        setHovered(false);
      },
    },
  ];
}
