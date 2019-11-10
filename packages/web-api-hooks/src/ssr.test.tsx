/** @jest-environment node */

import React, { useRef } from 'react';
import { renderToString } from 'react-dom/server';
import * as hooks from '.';

interface HookProps<T> {
  callback: () => T;
}

function Hook<T>({ callback }: HookProps<T>): JSX.Element {
  return <>{JSON.stringify(callback())}</>;
}

function renderHookToString<T>(callback: () => T): string {
  return renderToString(<Hook callback={callback} />);
}

test.each(
  Object.entries({
    // Provide dummy parameters for hooks which need them
    ...hooks,
    useEventListener: () =>
      hooks.useEventListener(
        (undefined as unknown) as EventTarget,
        'foo',
        () => {},
      ),
    useGeolocation: () => hooks.useGeolocation(),
    useInterval: () => hooks.useInterval(() => {}, 0),
    useLocalStorage: () => hooks.useLocalStorage('foo'),
    useMedia: () => hooks.useMedia('(min-width: 600px)'),
    useSize: () => hooks.useSize(useRef<HTMLElement>(null)),
    useSessionStorage: () => hooks.useSessionStorage('foo'),
  }),
)('%s supports SSR', (_name, callback) => {
  renderHookToString(callback);
});
