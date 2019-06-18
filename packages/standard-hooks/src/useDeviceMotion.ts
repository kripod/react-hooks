import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

const initialState: Omit<DeviceMotionEvent, keyof Event> = {
  acceleration: null,
  accelerationIncludingGravity: null,
  rotationRate: null,
  interval: 0,
};

export default function useDeviceMotion() {
  const [motion, setMotion] = useState(initialState);

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
