import { renderHook } from '@testing-library/react-hooks';
import { useMedia } from '.';

test('evaluates media query', () => {
  const addEventListener = jest.fn();
  const removeEventListener = jest.fn();

  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: false,
    addEventListener,
    removeEventListener,
  }));

  const { result, unmount } = renderHook(() => useMedia('(min-width: 600px)'));
  expect(result.current).toBe(false);
  expect(addEventListener).toHaveBeenCalled();

  unmount();
  expect(removeEventListener).toHaveBeenCalled();
});
