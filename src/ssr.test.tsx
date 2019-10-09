/** @jest-environment node */

import React, { useState } from 'react';
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
      hooks.useEventListener(
        (undefined as unknown) as EventTarget,
        'foo',
        () => {},
      ),
    useGeolocation: () => hooks.useGeolocation(),
    useInterval: () => hooks.useInterval(() => {}, 0),
    useLocalStorage: () => hooks.useLocalStorage('foo'),
    useMedia: () => hooks.useMedia('(min-width: 600px)'),
    usePrevious: () => hooks.usePrevious(0),
    useSessionStorage: () => hooks.useSessionStorage('foo'),
    useTimeline: () => hooks.useTimeline(0),
    useUndoable: () => hooks.useUndoable(useState()),
    useToggle: () => hooks.useToggle(useState(false as boolean)),
  }),
)('%s supports SSR', (_name, callback) => {
  renderHookToString(callback);
});
