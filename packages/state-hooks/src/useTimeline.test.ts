import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';

import { usePrevious, useTimeline } from '.';

test('store previous states indefinitely', () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const counts = useTimeline(count);
    return { count, setCount, counts };
  });
  expect(result.current.counts).toEqual([0]);

  act(() => {
    result.current.setCount(11);
  });
  expect(result.current.counts).toEqual([0, 11]);

  act(() => {
    result.current.setCount(22);
  });
  expect(result.current.counts).toEqual([0, 11, 22]);
});

test('store previous states with a space limit', () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const counts = useTimeline(count, 2);
    return { count, setCount, counts };
  });
  expect(result.current.counts).toEqual([0]);

  act(() => {
    result.current.setCount(11);
  });
  expect(result.current.counts).toEqual([0, 11]);

  act(() => {
    result.current.setCount(22);
  });
  expect(result.current.counts).toEqual([11, 22]);
});

test('immutability of timeline values', () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const counts = useTimeline(count, 2);
    const prevCounts = usePrevious(counts);
    return { count, setCount, counts, prevCounts };
  });
  expect(result.current.prevCounts).toBe(undefined);

  act(() => {
    result.current.setCount(11);
  });
  expect(result.current.counts).toEqual([0, 11]);
  expect(result.current.prevCounts).toEqual([0]);

  act(() => {
    result.current.setCount(22);
  });
  expect(result.current.counts).toEqual([11, 22]);
  expect(result.current.prevCounts).toEqual([0, 11]);
});

test('change timeline length limit', () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const [maxLength, setMaxLength] = useState(10);
    const counts = useTimeline(count, maxLength);
    return { count, setCount, setMaxLength, counts };
  });

  act(() => {
    result.current.setCount(11);
  });
  expect(result.current.counts).toEqual([0, 11]);

  act(() => {
    result.current.setCount(22);
  });
  expect(result.current.counts).toEqual([0, 11, 22]);

  act(() => {
    result.current.setMaxLength(2);
  });
  expect(result.current.counts).toEqual([11, 22]);
});
