import { act, renderHook } from '@testing-library/react-hooks';

import { useChanging } from '.';

jest.useFakeTimers();

test('detect changes of a value over time', () => {
  const { result, rerender } = renderHook(({ value }) => useChanging(value), {
    initialProps: { value: 0 },
  });
  expect(result.current).toBe(false);

  rerender({ value: 1 });
  expect(result.current).toBe(true);

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(result.current).toBe(true);

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(result.current).toBe(false);

  rerender({ value: 2 });
  expect(result.current).toBe(true);
});

test('handle changing grouping interval', () => {
  const { result, rerender } = renderHook(
    ({ value, groupingIntervalMs }) => useChanging(value, groupingIntervalMs),
    { initialProps: { value: 0, groupingIntervalMs: 500 } },
  );

  rerender({ value: 1, groupingIntervalMs: 500 });
  act(() => {
    jest.advanceTimersByTime(300);
  });
  expect(result.current).toBe(true);

  rerender({ value: 1, groupingIntervalMs: 1000 });
  act(() => {
    jest.advanceTimersByTime(700);
  });
  expect(result.current).toBe(true);

  act(() => {
    jest.advanceTimersByTime(300);
  });
  expect(result.current).toBe(false);
});
