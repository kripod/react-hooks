import { useState } from 'react';
import usePrevious from './usePrevious';
import { MAX_ARRAY_INDEX } from './utils';

export default function useTimeline<T>(
  value: T,
  maxLength: number = MAX_ARRAY_INDEX,
): T[] {
  // TODO: Consider logging a warning if maxLength <= 1
  const [values, setValues] = useState(maxLength > 0 ? [value] : []);
  const prevValue = usePrevious(value);

  if (!Object.is(value, prevValue)) {
    setValues(prevValues =>
      [...prevValues, value].splice(-maxLength, maxLength),
    );
  }

  return values;
}
