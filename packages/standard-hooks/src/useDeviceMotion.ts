import { useEffect, useState } from 'react';
import { EventArgs, managedEventListener } from './utils';

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
 * const Example = () => {
 *   const { acceleration, rotationRate, interval } = useDeviceMotion();
 *   // ...
 * };
 */
export default function useDeviceMotion(): EventArgs<DeviceMotionEvent> {
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
