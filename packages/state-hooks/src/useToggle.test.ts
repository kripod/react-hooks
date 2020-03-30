import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';

import { useToggle } from '.';

test('negate toggle state', () => {
  const { result } = renderHook(() => useToggle(useState<boolean>(false)));
  expect(result.current[0]).toBe(false);

  act(() => {
    result.current[2]();
  });
  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[2]();
  });
  expect(result.current[0]).toBe(false);
});

test('set toggle state', () => {
  const { result } = renderHook(() => useToggle(useState<boolean>(true)));
  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[1](true);
  });
  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[1](false);
  });
  expect(result.current[0]).toBe(false);
});
