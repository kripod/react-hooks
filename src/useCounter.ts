import { useCallback } from 'react';
import { modifySetStateAction } from './utils';

/**
 * Wraps a numeric state hook to add increment/decrement functionality.
 *
 * @param useStateResult Return value of a state hook.
 * @param useStateResult.0 Current state.
 * @param useStateResult.1 State updater function.
 * @param minValue Minimum value.
 * @param maxValue Maximum value.
 * @returns State hook result extended with `increment` and `decrement`.
 *
 * @example
 * function Example() {
 *   const [count, , incrementCount, decrementCount] = useCounter(useState(0));
 *   // ...
 *   return (
 *     <>
 *       <button type="button" onClick={() => decrementCount(1)}>
 *         -
 *       </button>
 *       <input value={count} readOnly />
 *       <button type="button" onClick={() => incrementCount(1)}>
 *         +
 *       </button>
 *     </>
 *   );
 * }
 */
export default function useCounter(
  [value, setValue]: [number, React.Dispatch<React.SetStateAction<number>>],
  minValue: number = Number.NEGATIVE_INFINITY,
  maxValue: number = Number.POSITIVE_INFINITY,
): [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  (amount?: number) => void,
  (amount?: number) => void,
] {
  const newSetValue = useCallback(
    (update: React.SetStateAction<number>) => {
      setValue(
        modifySetStateAction(update, nextValue =>
          Math.max(minValue, Math.min(maxValue, nextValue)),
        ),
      );
    },
    [maxValue, minValue, setValue],
  );

  const incrementValue = useCallback(
    (amount = 1) => {
      newSetValue(prevValue => prevValue + amount);
    },
    [newSetValue],
  );

  const decrementValue = useCallback(
    (amount = 1) => {
      incrementValue(-amount);
    },
    [incrementValue],
  );

  return [value, newSetValue, incrementValue, decrementValue];
}
