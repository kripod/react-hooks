import { useCallback, useRef, useState } from 'react';
import { extendSetStateAction } from './utils';

export default function useUndoable<T>([value, setValue]: [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  () => void,
  () => void,
]) {
  // Source: https://github.com/mjackson/react-loop-2019
  const valuesRef = useRef([value]);
  const [index, setIndex] = useState(0);

  function newSetValue(update: React.SetStateAction<T>) {
    const nextIndex = index + 1;

    setValue(
      extendSetStateAction(update, nextValue => {
        // Truncate any future redos
        valuesRef.current = valuesRef.current.slice(0, nextIndex);
        valuesRef.current.push(nextValue);
      }),
    );

    setIndex(nextIndex);
  }

  const undo = useCallback(() => {
    setIndex(prevIndex => Math.max(0, prevIndex - 1));
  }, []);

  const redo = useCallback(() => {
    setIndex(prevIndex =>
      Math.min(valuesRef.current.length - 1, prevIndex + 1),
    );
  }, []);

  return [valuesRef.current[index], newSetValue, undo, redo];
}
