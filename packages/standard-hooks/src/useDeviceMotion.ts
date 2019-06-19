import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

const initialState: Omit<DeviceMotionEvent, keyof Event> = {
  acceleration: null,
  accelerationIncludingGravity: null,
  rotationRate: null,
  interval: 0,
};

/**
 * Tracks acceleration and rotation rate of the device.
 *
 * @returns {DeviceMotionEvent} An instance of [`DeviceMotionEventInit`](https://w3c.github.io/deviceorientation/#dictdef-devicemotioneventinit), constructed without parameters by default.
 * @see [`DeviceMotionEvent`](https://developer.mozilla.org/docs/Web/API/DeviceMotionEvent)
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
