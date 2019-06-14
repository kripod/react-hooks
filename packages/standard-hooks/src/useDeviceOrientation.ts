import { useEffect, useState } from 'react';
import { eventListenerEffect } from './utils';

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
      eventListenerEffect(window, 'deviceorientation', ((
        event: DeviceOrientationEvent,
      ) => {
        setOrientation(event);
      }) as EventListener),
    [],
  );

  return orientation;
}
