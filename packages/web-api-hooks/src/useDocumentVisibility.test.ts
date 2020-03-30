import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useDocumentVisibility } from '.';

test('change document visibility', () => {
  const { result } = renderHook(() => useDocumentVisibility());
  expect(result.current).toBe('visible');

  act(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden' });
    fireEvent(document, new Event('visibilitychange'));
  });
  expect(result.current).toBe('hidden');
});
