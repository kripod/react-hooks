import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useDocumentReadiness } from '.';

test('change document readiness', () => {
  const { result } = renderHook(() => useDocumentReadiness());

  act(() => {
    Object.defineProperty(document, 'readyState', { value: 'interactive' });
    fireEvent(document, new ProgressEvent('readystatechange'));
  });
  expect(result.current).toBe('interactive');
});
