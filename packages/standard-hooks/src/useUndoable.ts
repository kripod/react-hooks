import { useCallback, useRef, useState } from 'react';
import { extendSetStateAction } from './utils';

/**
 * Wraps a state hook to add undo/redo functionality.
 *
 * @param useStateResult Return value of a state hook.
 * @param useStateResult.0 Current state.
 * @param useStateResult.1 State updater function.
 * @returns State hook result extended with `undo`, `redo`, `canUndo` and `canRedo`.
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
  boolean,
  boolean,
] {
  // Source: https://github.com/mjackson/react-loop-2019
  const valuesRef = useRef([value]);
  const [index, setIndex] = useState(0);

  const newSetValue = useCallback(
    (update: React.SetStateAction<T>) => {
      const nextIndex = index + 1;

      setValue(
        extendSetStateAction(update, nextValue => {
          // Truncate any future redos
          valuesRef.current = valuesRef.current.slice(0, nextIndex);
          valuesRef.current.push(nextValue);
        }),
      );

      setIndex(nextIndex);
    },
    [index, setValue],
  );

  const undo = useCallback(() => {
    setIndex(prevIndex => Math.max(0, prevIndex - 1));
  }, []);

  const redo = useCallback(() => {
    setIndex(prevIndex =>
      Math.min(valuesRef.current.length - 1, prevIndex + 1),
    );
  }, []);

  const canUndo = index > 0;
  const canRedo = index < valuesRef.current.length - 1;

  return [valuesRef.current[index], newSetValue, undo, redo, canUndo, canRedo];
}
