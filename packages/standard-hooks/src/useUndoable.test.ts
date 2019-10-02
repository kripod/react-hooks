import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import { useUndoable } from '.';

test('basic undo/redo functionality', () => {
  const { result } = renderHook(() => useUndoable(useState(123)));
  expect(result.current[0]).toBe(123);

  const [, setValue, undo, redo] = result.current;

  act(() => {
    setValue(456);
  });
  expect(result.current[0]).toBe(456);
  expect(result.current[4]).toEqual([123]);
  expect(result.current[5]).toEqual([]);

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(123);
  expect(result.current[4]).toEqual([]);
  expect(result.current[5]).toEqual([456]);

  act(() => {
    redo();
  });
  expect(result.current[0]).toBe(456);
  expect(result.current[4]).toEqual([123]);
  expect(result.current[5]).toEqual([]);
});

test('apply state updater function on undoable state', () => {
  const { result } = renderHook(() => useUndoable(useState(123)));
  expect(result.current[0]).toBe(123);

  const [, setValue] = result.current;

  act(() => {
    setValue(prevValue => prevValue + 1);
  });
  expect(result.current[0]).toBe(124);
});

test('avoids overflow/underflow during undo/redo', () => {
  const { result } = renderHook(() => useUndoable(useState(123)));
  expect(result.current[0]).toBe(123);

  const [, setValue, undo, redo] = result.current;

  act(() => {
    setValue(456);
  });
  expect(result.current[0]).toBe(456);

  act(() => {
    redo();
  });
  expect(result.current[0]).toBe(456);

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(123);

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(123);
});

test('truncates redos on undoable state update', () => {
  const { result } = renderHook(() => useUndoable(useState(123)));
  expect(result.current[0]).toBe(123);

  const [, setValue, undo, redo] = result.current;

  act(() => {
    setValue(456);
  });
  expect(result.current[0]).toBe(456);

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(123);

  act(() => {
    setValue(1000);
  });
  expect(result.current[0]).toBe(1000);

  act(() => {
    redo();
  });
  expect(result.current[0]).toBe(1000);

  act(() => {
    undo();
  });
  expect(result.current[0]).toBe(123);
});
