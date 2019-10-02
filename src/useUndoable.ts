import { useCallback, useRef } from 'react';

/**
 * Wraps a state hook to add undo/redo functionality.
 *
 * @param useStateResult Return value of a state hook.
 * @param useStateResult.0 Current state.
 * @param useStateResult.1 State updater function.
 * @returns State hook result extended with `undo`, `redo`, `pastValues` and `futureValues`.
 *
 * @example
 * function Example() {
 *   const [value, setValue, undo, redo, canUndo, canRedo] = useUndoable(
 *     useState(''),
 *   );
 *   // ...
 *   return (
 *     <>
 *       <button type="button" disabled={!canUndo} onClick={undo}>
 *         Undo
 *       </button>
 *       <input value={value} onChange={e => setValue(e.target.value)} />
 *       <button type="button" disabled={!canRedo} onClick={redo}>
 *         Redo
 *       </button>
 *     </>
 *   );
 * }
 */
export default function useUndoable<T>([value, setValue]: [
  T,
  React.Dispatch<React.SetStateAction<T>>,
]): [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  () => void,
  () => void,
  T[],
  T[],
] {
  // Source: https://github.com/mjackson/react-loop-2019
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
        futureValuesRef.current = [prevValue, ...futureValuesRef.current];
        pastValuesRef.current = pastValuesRef.current.slice(0, -1);
        return nextValue;
      });
    }
  }, [setValue]);

  const redo = useCallback(() => {
    if (futureValuesRef.current.length > 0) {
      setValue(prevValue => {
        const nextValue = futureValuesRef.current[0];
        pastValuesRef.current = [...pastValuesRef.current, prevValue];
        futureValuesRef.current = futureValuesRef.current.slice(1);
        return nextValue;
      });
    }
  }, [setValue]);

  return [
    value,
    newSetValue,
    undo,
    redo,
    pastValuesRef.current,
    futureValuesRef.current,
  ];
}
