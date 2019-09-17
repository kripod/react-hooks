import { renderHook } from '@testing-library/react-hooks';
import { useMedia } from '.';

test('evaluates media query', () => {
  const addEventListener = jest.fn();
  const removeEventListener = jest.fn();

  window.matchMedia = query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener,
    removeEventListener,
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });

  const { result, unmount } = renderHook(() => useMedia('(min-width: 600px)'));

  expect(addEventListener).toHaveBeenCalled();

  expect(result.current).toEqual(false);

  unmount();
  expect(removeEventListener).toHaveBeenCalled();
});
