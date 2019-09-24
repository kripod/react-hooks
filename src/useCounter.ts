import { useCallback } from 'react';
import { extendSetStateAction } from './utils';

export default function useCounter(
  [value, setValue]: [number, React.Dispatch<React.SetStateAction<number>>],
  minValue: number = Number.NEGATIVE_INFINITY,
  maxValue: number = Number.POSITIVE_INFINITY,
) {
  const newSetValue = useCallback(
    (update: React.SetStateAction<number>) => {
      setValue(prevValue => {
        const nextValue =
          typeof update === 'function' ? update(prevValue) : update;

        return Math.max(minValue, Math.min(maxValue, nextValue));
      });
    },
    [maxValue, minValue, setValue],
  );

  return [value, newSetValue];
}
