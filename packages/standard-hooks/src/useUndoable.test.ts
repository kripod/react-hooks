import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import { useUndoable } from '.';

test('basic undo/redo functionality', () => {
  const { result } = renderHook(() => useUndoable(useState(11)));
  expect(result.current[0]).toBe(11);

  const [, setValue, { undo, redo }] = result.current;

  act(() => {
    setValue(22);
  });
  expect(result.current[0]).toBe(22);
  expect(result.current[2].past).toEqual([11]);
  expect(result.current[2].future).toEqual([]);

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(11);
  expect(result.current[2].past).toEqual([]);
  expect(result.current[2].future).toEqual([22]);

  act(() => {
    redo();
  });
  expect(result.current[0]).toBe(22);
  expect(result.current[2].past).toEqual([11]);
  expect(result.current[2].future).toEqual([]);
});

test('apply state updater function on undoable state', () => {
  const { result } = renderHook(() => useUndoable(useState(11)));

  const [, setValue] = result.current;

  act(() => {
    setValue(prevValue => prevValue + 1);
  });
  expect(result.current[0]).toBe(12);
});

test('avoids overflow/underflow during undo/redo', () => {
  const { result } = renderHook(() => useUndoable(useState(11)));

  const [, setValue, { undo, redo }] = result.current;

  act(() => {
    setValue(22);
  });

  act(() => {
    redo();
  });
  expect(result.current[0]).toBe(22);

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(11);

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(11);
});

test('truncates redos on undoable state update', () => {
  const { result } = renderHook(() => useUndoable(useState(11)));

  const [, setValue, { undo, redo }] = result.current;

  act(() => {
    setValue(22);
  });

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(11);

  act(() => {
    setValue(33);
  });
  expect(result.current[0]).toBe(33);

  act(() => {
    redo();
  });
  expect(result.current[0]).toBe(33);

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(11);
});

test('limits amount of deltas available', () => {
  const { result, rerender } = renderHook(
    ({ maxDeltas }) => useUndoable(useState(11), maxDeltas),
    { initialProps: { maxDeltas: 2 } },
  );

  const [, setValue, { undo }] = result.current;

  act(() => {
    setValue(22);
  });
  act(() => {
    setValue(33);
  });
  expect(result.current[2].past).toEqual([11, 22]);

  act(() => {
    setValue(44);
  });
  expect(result.current[2].past).toEqual([22, 33]);

  rerender({ maxDeltas: 1 });
  expect(result.current[2].past).toEqual([33]);

  rerender({ maxDeltas: 2 });
  act(() => {
    setValue(11);
  });
  expect(result.current[2].past).toEqual([33, 44]);

  act(() => {
    undo();
  });
  expect(result.current[2].past).toEqual([33]);
  expect(result.current[2].future).toEqual([11]);

  rerender({ maxDeltas: 1 });
  expect(result.current[2].past).toEqual([33]);
  expect(result.current[2].future).toEqual([]);

  rerender({ maxDeltas: 0 });
  expect(result.current[2].past).toEqual([]);
  expect(result.current[2].future).toEqual([]);
});
