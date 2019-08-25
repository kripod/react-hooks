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

test.each(Object.entries(hooks))('%s supports SSR', (_name, callback) => {
  // TODO: Provide dummy parameters for hooks which need them
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderHookToString(callback as any);
});
