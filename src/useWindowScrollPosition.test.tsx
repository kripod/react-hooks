import { fireEvent } from '@testing-library/react';
import { act, renderHook } from 'react-hooks-testing-library';
import { useWindowScrollPosition } from '.';

test('change window scroll position', async () => {
  const { result, waitForNextUpdate, unmount } = renderHook(() =>
    useWindowScrollPosition(),
  );
  expect(result.current.join()).toBe('0,0');

  act(() => {
    (window.scrollX as number) = 123;
    (window.scrollY as number) = 456;
    fireEvent.scroll(window);

    (async () => {
      await waitForNextUpdate();
      expect(result.current.join()).toBe('123,456');
      unmount();
    })();
  });
});
