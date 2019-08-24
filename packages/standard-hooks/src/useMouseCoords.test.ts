import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useMouseCoords } from '.';

test('change window mouse coords', () => {
  const { result } = renderHook(() => useMouseCoords());
  expect(result.current).toEqual([0, 0]);

  act(() => {
    fireEvent.mouseMove(window, {
      clientX: 123,
      clientY: 456,
    });
  });
  expect(result.current).toEqual([123, 456]);
});
