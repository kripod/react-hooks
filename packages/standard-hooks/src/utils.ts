export const canUseDOM = typeof window !== 'undefined';

export function managedEventListener(
  target: EventTarget,
  type: string,
  callback: EventListener,
  options?: boolean | AddEventListenerOptions,
) {
  target.addEventListener(type, callback, options);
  return () => {
    target.removeEventListener(type, callback, options);
  };
}

export function managedInterval(callback: () => void, delayMs: number) {
  const id = setInterval(callback, delayMs);
  return () => {
    clearInterval(id);
  };
}
