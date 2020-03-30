import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useNetworkAvailability } from '.';

test('change network availability', () => {
  const { result } = renderHook(() => useNetworkAvailability());
  expect(result.current).toBe(true);

  act(() => {
    fireEvent(window, new Event('offline'));
  });
  expect(result.current).toBe(false);
});
