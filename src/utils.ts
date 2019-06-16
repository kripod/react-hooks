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

export function smoothAnimation(callback: FrameRequestCallback) {
  // Details: https://www.html5rocks.com/en/tutorials/speed/animations/
  let ticking = false;
  return () => {
    if (!ticking) {
      requestAnimationFrame(timeStamp => {
        callback(timeStamp);
        ticking = false;
      });
      ticking = true;
    }
  };
}
