import { act, renderHook } from '@testing-library/react-hooks';
import { useToggle } from '.';

test('negate toggle state', () => {
  const { result } = renderHook(() => useToggle());
  expect(result.current[0]).toBe(false);

  act(() => {
    result.current[1]();
  });
  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[1]();
  });
  expect(result.current[0]).toBe(false);
});

test('set toggle state', () => {
  const { result } = renderHook(() => useToggle(true));
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
