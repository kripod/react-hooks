import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useWindowScrollPosition } from '.';

test('change window scroll position', () => {
  const { result } = renderHook(() => useWindowScrollPosition());
  expect(result.current).toEqual([0, 0]);

  act(() => {
    (window.scrollX as number) = 123;
    (window.scrollY as number) = 456;
    fireEvent.scroll(window);
  });
  expect(result.current).toEqual([123, 456]);
});
