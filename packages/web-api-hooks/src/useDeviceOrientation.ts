import { useEffect, useState } from 'react';

import { EventArgs } from './types';
import { managedEventListener } from './utils';

// Source: https://w3c.github.io/deviceorientation/#dictdef-deviceorientationeventinit
const initialState: EventArgs<DeviceOrientationEvent> = {
  alpha: null,
  beta: null,
  gamma: null,
  absolute: false,
};

/**
 * Tracks physical orientation of the device.
 *
 * @returns Own properties of the last corresponding event.
 *
 * @example
 * function Component() {
 *   const { alpha, beta, gamma } = useDeviceOrientation();
 *   // ...
 * }
 */
export default function useDeviceOrientation(): EventArgs<
  DeviceOrientationEvent
> {
  const [orientation, setOrientation] = useState(initialState);

  useEffect(
    () =>
      managedEventListener(window, 'deviceorientation', (event) => {
        setOrientation(event);
      }),
    [],
  );

  return orientation;
}
