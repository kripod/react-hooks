import { renderHook } from '@testing-library/react-hooks';

import { useMedia } from '.';

test('evaluates media query', () => {
  const addListener = jest.fn();
  const removeListener = jest.fn();

  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: false,
    addListener,
    removeListener,
  }));

  const { result, unmount } = renderHook(() => useMedia('(min-width: 600px)'));
  expect(result.current).toBe(false);
  expect(addListener).toHaveBeenCalled();

  unmount();
  expect(removeListener).toHaveBeenCalled();
});
