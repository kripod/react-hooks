import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useLanguagePreferences } from '.';

test('change preferred languages', () => {
  const { result } = renderHook(() => useLanguagePreferences());
  expect(result.current).toEqual(['en-US', 'en']);

  act(() => {
    Object.defineProperty(navigator, 'languages', {
      value: ['hu-HU', 'hu', 'en-US', 'en'],
    });
    fireEvent(window, new Event('languagechange'));
  });
  expect(result.current).toEqual(['hu-HU', 'hu', 'en-US', 'en']);
});
