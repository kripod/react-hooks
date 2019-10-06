import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import { usePrevious } from '.';

test('get previous state', () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    return {
      count,
      setCount,
      prevCount: usePrevious(count),
    };
  });
  expect(result.current.prevCount).toBe(undefined);

  act(() => {
    result.current.setCount(11);
  });
  expect(result.current.prevCount).toBe(0);

  act(() => {
    result.current.setCount(22);
  });
  expect(result.current.prevCount).toBe(11);
});
