import { renderHook } from '@testing-library/react-hooks';
import useMedia from './useMedia';

test('evaluates media query', () => {
  const isWidescreen = renderHook(() => useMedia('(min-width: 400px)'));
  expect(isWidescreen).toEqual(true);
});
