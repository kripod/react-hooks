import { useRef } from 'react';

export default function useSmoothAnimation(callback: FrameRequestCallback) {
  // Details: https://www.html5rocks.com/en/tutorials/speed/animations/
  const tickingRef = useRef(false);
  return () => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(timeStamp => {
        callback(timeStamp);
        tickingRef.current = false;
      });
    }
  };
}
