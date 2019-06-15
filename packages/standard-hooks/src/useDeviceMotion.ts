import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

export default function useDeviceMotion() {
  const [motion, setMotion] = useState<Omit<DeviceMotionEvent, keyof Event>>({
    acceleration: null,
    accelerationIncludingGravity: null,
    rotationRate: null,
    interval: 0,
  });

  useEffect(
    () =>
      managedEventListener(window, 'devicemotion', ((
        event: DeviceMotionEvent,
      ) => {
        setMotion(event);
      }) as EventListener),
    [],
  );

  return motion;
}
