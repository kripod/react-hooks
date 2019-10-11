import { useEffect, useState } from 'react';
import { EventArgs } from './types';
import { managedEventListener } from './utils';

// Source: https://w3c.github.io/deviceorientation/#dictdef-devicemotioneventinit
const initialState: EventArgs<DeviceMotionEvent> = {
  acceleration: null,
  accelerationIncludingGravity: null,
  rotationRate: null,
  interval: 0,
};

/**
 * Tracks acceleration and rotation rate of the device.
 *
 * @returns Own properties of the last corresponding event.
 *
 * @example
 * function Example() {
 *   const { acceleration, rotationRate, interval } = useDeviceMotion();
 *   // ...
 * }
 */
export default function useDeviceMotion(): EventArgs<DeviceMotionEvent> {
  const [motion, setMotion] = useState(initialState);

  // TODO: Request permission if necessary, see https://github.com/w3c/deviceorientation/issues/57

  useEffect(
    () =>
      managedEventListener(window, 'devicemotion', event => {
        setMotion(event);
      }),
    [],
  );

  return motion;
}
