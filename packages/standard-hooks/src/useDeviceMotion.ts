import { useEffect, useState } from 'react';
import { eventListenerEffect } from './utils';

export default function useDeviceMotion() {
  const [motion, setMotion] = useState<Omit<DeviceMotionEvent, keyof Event>>({
    acceleration: null,
    accelerationIncludingGravity: null,
    rotationRate: null,
    interval: 0,
  });

  useEffect(
    eventListenerEffect(window, 'devicemotion', ((event: DeviceMotionEvent) => {
      setMotion(event);
    }) as EventListener),
    [],
  );

  return motion;
}
