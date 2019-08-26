/** @jest-environment node */

import React from 'react';
import { renderToString } from 'react-dom/server';
import * as hooks from '.';

interface HookProps<T> {
  callback: () => T;
}

function Hook<T>({ callback }: HookProps<T>) {
  return <>{JSON.stringify(callback())}</>;
}

function renderHookToString<T>(callback: () => T) {
  return renderToString(<Hook callback={callback} />);
}

test.each(
  Object.entries({
    // Provide dummy parameters for hooks which need them
    ...hooks,
    useEventListener: () =>
      hooks.useEventListener(new EventTarget(), 'foo', () => {}),
    useGeolocation: () => hooks.useGeolocation(),
    useInterval: () => hooks.useInterval(() => {}, 0),
    useStorage: () => hooks.useStorage('foo'),
  }),
)('%s supports SSR', (_name, callback) => {
  renderHookToString(callback);
});
