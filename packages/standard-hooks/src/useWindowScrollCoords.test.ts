import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useWindowScrollCoords } from '.';

test('change window scroll coords', () => {
  const { result } = renderHook(() => useWindowScrollCoords());
  expect(result.current).toEqual([0, 0]);

  act(() => {
    (window.pageXOffset as number) = 123;
    (window.pageYOffset as number) = 456;
    fireEvent.scroll(window);
  });
  expect(result.current).toEqual([123, 456]);
});
