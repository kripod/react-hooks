import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

const initialState: Omit<DeviceOrientationEvent, keyof Event> = {
  alpha: null,
  beta: null,
  gamma: null,
  absolute: false,
};

/**
 * Tracks physical orientation of the device.
 *
 * @returns {DeviceOrientationEvent} Defaults to an instance of [`DeviceOrientationEventInit`](https://w3c.github.io/deviceorientation/#dictdef-deviceorientationeventinit) constructed without parameters.
 * @example
 * const Example = () => {
 *   const { alpha, beta, gamma, absolute } = useDeviceOrientation();
 *   // ...
 * };
 */
export default function useDeviceOrientation() {
  const [orientation, setOrientation] = useState(initialState);

  useEffect(
    () =>
      managedEventListener(window, 'deviceorientation', ((
        event: DeviceOrientationEvent,
      ) => {
        setOrientation(event);
      }) as EventListener),
    [],
  );

  return orientation;
}
