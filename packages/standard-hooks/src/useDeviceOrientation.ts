import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

export default function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<
    Omit<DeviceOrientationEvent, keyof Event>
  >({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false,
  });

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
