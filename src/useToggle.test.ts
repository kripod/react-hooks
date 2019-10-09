import { useState } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useToggle } from '.';

test('negate toggle state', () => {
  const { result: stateResult } = renderHook(() => useState(false));
  const { result } = renderHook(() => useToggle(stateResult.current));
  expect(result.current[0]).toBe(false);

  act(() => {
    result.current[2]();
  });
  expect(stateResult.current[0]).toBe(true);

  act(() => {
    result.current[2]();
  });
  expect(stateResult.current[0]).toBe(false);
});

test('set toggle state', () => {
  const { result: stateResult } = renderHook(() => useState(true));
  const { result } = renderHook(() => useToggle(stateResult.current));
  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[1](true);
  });
  expect(stateResult.current[0]).toBe(true);

  act(() => {
    result.current[1](false);
  });
  expect(stateResult.current[0]).toBe(false);
});
