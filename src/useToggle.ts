import { useCallback, useState } from 'react';

/**
 * Tracks state of a boolean value.
 *
 * @see [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate), which exposes a similar interface
 *
 * @param initialValue Initial value.
 * @returns {[boolean, function (nextValue: boolean?): void]} A statefully stored value, and a function to update it. The latter may be called without a boolean argument to negate the value.
 *
 * @example
 * const Example = () => {
 *   const [isPressed, togglePressed] = useToggle();
 *   // ...
 *   return (
 *     <button type="button" aria-pressed={isPressed} onClick={togglePressed}>
 *       Toggle state
 *     </button>
 *   );
 * };
 */
export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggleValue = useCallback((nextValue?: unknown) => {
    if (typeof nextValue === 'boolean') {
      setValue(nextValue);
    } else {
      setValue(prevValue => !prevValue);
    }
  }, []);

  return [value, toggleValue];
}
