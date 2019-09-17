import { renderHook } from '@testing-library/react-hooks';
import { useMedia } from '.';

test('evaluates media query', () => {
  const addListener = jest.fn();
  const removeListener = jest.fn();
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener,
      removeListener,
    };
  });

  const { result, unmount } = renderHook(() => useMedia('(min-width: 400px)'));

  expect(result.current).toEqual(false);
  expect(addListener).toHaveBeenCalled();
  unmount();
  expect(removeListener).toHaveBeenCalled();
});
