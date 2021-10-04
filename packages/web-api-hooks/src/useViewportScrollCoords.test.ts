import { renderHook } from '@testing-library/react-hooks';

import { useViewportScrollCoords } from '.';

test('useViewportScrollCoords falls back to [0, 0]', () => {
  const { result } = renderHook(() => useViewportScrollCoords());
  expect(result.current).toEqual([0, 0]);
});
