import { renderHook } from '@testing-library/react-hooks';

import { useViewportScale } from '.';

test('useViewportScale falls back to 1.0', () => {
  const { result } = renderHook(() => useViewportScale());
  expect(result.current).toEqual(1.0);
});
