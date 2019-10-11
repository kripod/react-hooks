import { renderHook } from '@testing-library/react-hooks';
import { useInterval } from '.';

// Source: https://github.com/donavon/use-interval/blob/master/__tests__/index.test.js

jest.useFakeTimers();

test('calls event handler each second', () => {
  const handler = jest.fn();

  const { unmount } = renderHook(() => useInterval(handler, 1000));
  expect(handler).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(5000);
  expect(handler).toHaveBeenCalledTimes(5);

  unmount();
});

test('pausing the timer', () => {
  const handler = jest.fn();

  const { unmount } = renderHook(() => useInterval(handler, null));

  jest.runAllTimers();
  expect(handler).toHaveBeenCalledTimes(0);

  unmount();
});

test('passing a new handler does not restart the timer', () => {
  const handler1 = jest.fn();
  const handler2 = jest.fn();

  const { rerender, unmount } = renderHook(
    ({ handler }) => useInterval(handler, 1000),
    { initialProps: { handler: handler1 } },
  );
  jest.advanceTimersByTime(500);

  rerender({ handler: handler2 });

  jest.advanceTimersByTime(500);
  expect(handler1).toHaveBeenCalledTimes(0);
  expect(handler2).toHaveBeenCalledTimes(1);

  unmount();
});

test('passing a new delay cancels the timer and starts a new one', () => {
  const handler = jest.fn();

  const { rerender, unmount } = renderHook(
    ({ delay }) => useInterval(handler, delay),
    { initialProps: { delay: 500 } },
  );
  jest.advanceTimersByTime(1000);
  expect(handler).toHaveBeenCalledTimes(2);

  rerender({ delay: 1000 });

  jest.advanceTimersByTime(5000);
  expect(handler).toHaveBeenCalledTimes(7);

  unmount();
});

test('passing the same parameters causes no change in the timer', () => {
  const handler = jest.fn();

  const { rerender, unmount } = renderHook(() => useInterval(handler, 1000));
  jest.advanceTimersByTime(500);

  rerender();

  jest.advanceTimersByTime(500);
  expect(handler).toHaveBeenCalledTimes(1);

  unmount();
});
