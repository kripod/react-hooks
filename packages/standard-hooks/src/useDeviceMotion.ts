import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

// Source: https://w3c.github.io/deviceorientation/#dictdef-devicemotioneventinit
const initialState: Omit<DeviceMotionEvent, keyof Event> = {
  acceleration: null,
  accelerationIncludingGravity: null,
  rotationRate: null,
  interval: 0,
};

/**
 * Tracks acceleration and rotation rate of the device.
 *
 * @returns Own properties of the last received [`DeviceMotionEvent`](https://developer.mozilla.org/docs/Web/API/DeviceMotionEvent).
 *
 * @example
 * const Example = () => {
 *   const { acceleration, rotationRate, interval } = useDeviceMotion();
 *   // ...
 * };
 */
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
