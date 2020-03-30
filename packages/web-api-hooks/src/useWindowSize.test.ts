import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useWindowSize } from '.';

test('change window size', () => {
  const { result } = renderHook(() => useWindowSize());
  expect(result.current).toEqual([1024, 768]);

  act(() => {
    (window.innerWidth as number) = 1920;
    (window.innerHeight as number) = 1080;
    fireEvent(window, new UIEvent('resize'));
  });
  expect(result.current).toEqual([1920, 1080]);
});
