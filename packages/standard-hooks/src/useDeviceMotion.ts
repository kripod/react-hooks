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
 * @returns {DeviceMotionEvent} Defaults to an instance of [`DeviceMotionEventInit`](https://w3c.github.io/deviceorientation/#dictdef-devicemotioneventinit) constructed without parameters.
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
