import { useCallback } from 'react';

/* eslint-disable jsdoc/valid-types */

/**
 * Wraps a state hook to add boolean toggle functionality.
 *
 * @param useStateResult Return value of a state hook.
 * @param useStateResult.0 Current state.
 * @param useStateResult.1 State updater function.
 * @returns State hook result extended with a `toggle` function.
 *
 * @example
 * function Example() {
 *   const [isPressed, togglePressed] = useToggle();
 *   // ...
 *   return (
 *     <button type="button" aria-pressed={isPressed} onClick={togglePressed}>
 *       Toggle state
 *     </button>
 *   );
 * }
 */
export default function useToggle([value, setValue]: [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
]): [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void] {
  const toggleValue = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, [setValue]);
  return [value, setValue, toggleValue];
}
