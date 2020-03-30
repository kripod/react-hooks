import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useWindowScrollCoords } from '.';

test('change window scroll coords', () => {
  const { result } = renderHook(() => useWindowScrollCoords());
  expect(result.current).toEqual([0, 0]);

  act(() => {
    (window.pageXOffset as number) = 11;
    (window.pageYOffset as number) = 22;
    fireEvent.scroll(window);
  });
  expect(result.current).toEqual([11, 22]);
});
