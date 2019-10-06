import { useCallback, useRef } from 'react';
import { MAX_SMALL_INTEGER } from './utils';

/**
 * Wraps a state hook to add undo/redo functionality.
 *
 * @param useStateResult Return value of a state hook.
 * @param useStateResult.0 Current state.
 * @param useStateResult.1 State updater function.
 * @param maxDeltas Maximum amount of state differences to store at once. Should be a positive integer.
 * @returns State hook result extended with `undo`, `redo`, `pastValues` and `futureValues`.
 *
 * @example
 * function Example() {
 *   const [value, setValue, undo, redo, pastValues, futureValues] = useUndoable(
 *     useState(''),
 *   );
 *   // ...
 *   return (
 *     <>
 *       <button type="button" onClick={undo} disabled={pastValues.length === 0}>
 *         Undo
 *       </button>
 *       <input value={value} onChange={e => setValue(e.target.value)} />
 *       <button type="button" onClick={redo} disabled={futureValues.length === 0}>
 *         Redo
 *       </button>
 *     </>
 *   );
 * }
 */
export default function useUndoable<T>(
  [value, setValue]: [T, React.Dispatch<React.SetStateAction<T>>],
  maxDeltas: number = MAX_SMALL_INTEGER,
): [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  () => void,
  () => void,
  T[],
  T[],
] {
  // Source: https://redux.js.org/recipes/implementing-undo-history
  const pastValuesRef = useRef<T[]>([]);
  const futureValuesRef = useRef<T[]>([]);

  const newSetValue = useCallback(
    (update: React.SetStateAction<T>) => {
      setValue(prevValue => {
        futureValuesRef.current = [];
        pastValuesRef.current = [...pastValuesRef.current, prevValue];
        return typeof update === 'function'
          ? (update as (prevValue: T) => T)(prevValue)
          : update;
      });
    },
    [setValue],
  );

  const undo = useCallback(() => {
    if (pastValuesRef.current.length > 0) {
      setValue(prevValue => {
        const nextValue =
          pastValuesRef.current[pastValuesRef.current.length - 1];
        pastValuesRef.current = pastValuesRef.current.slice(0, -1);
        futureValuesRef.current = [prevValue, ...futureValuesRef.current];
        return nextValue;
      });
    }
  }, [setValue]);

  const redo = useCallback(() => {
    if (futureValuesRef.current.length > 0) {
      setValue(prevValue => {
        const nextValue = futureValuesRef.current[0];
        futureValuesRef.current = futureValuesRef.current.slice(1);
        pastValuesRef.current = [...pastValuesRef.current, prevValue];
        return nextValue;
      });
    }
  }, [setValue]);

  const deltas = pastValuesRef.current.length + futureValuesRef.current.length;
  if (deltas > maxDeltas) {
    futureValuesRef.current.splice(
      futureValuesRef.current.length - (deltas - maxDeltas),
      MAX_SMALL_INTEGER,
    );
    pastValuesRef.current.splice(0, pastValuesRef.current.length - maxDeltas);
  }

  return [
    value,
    newSetValue,
    undo,
    redo,
    pastValuesRef.current,
    futureValuesRef.current,
  ];
}
