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
    result.current.setCount(123);
  });
  expect(result.current.counts).toEqual([0, 123]);

  act(() => {
    result.current.setCount(456);
  });
  expect(result.current.counts).toEqual([0, 123, 456]);
});

test('store previous states with a space limit', () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const counts = useTimeline(count, 2);
    return { count, setCount, counts };
  });
  expect(result.current.counts).toEqual([0]);

  act(() => {
    result.current.setCount(123);
  });
  expect(result.current.counts).toEqual([0, 123]);

  act(() => {
    result.current.setCount(456);
  });
  expect(result.current.counts).toEqual([123, 456]);

  act(() => {
    result.current.setCount(789);
  });
  expect(result.current.counts).toEqual([456, 789]);
});

test('immutability of timeline values', () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    const counts = useTimeline(count, 2);
    const prevCounts = usePrevious(counts);
    return { count, setCount, counts, prevCounts };
  });
  expect(result.current.counts).toEqual([0]);
  expect(result.current.prevCounts).toBe(undefined);

  act(() => {
    result.current.setCount(123);
  });
  expect(result.current.counts).toEqual([0, 123]);
  expect(result.current.prevCounts).toEqual([0]);

  act(() => {
    result.current.setCount(456);
  });
  expect(result.current.counts).toEqual([123, 456]);
  expect(result.current.prevCounts).toEqual([0, 123]);
});
