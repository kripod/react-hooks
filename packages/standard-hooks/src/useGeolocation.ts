import { useEffect, useState } from 'react';

export default function useGeolocation(
  options?: PositionOptions,
  // TODO: errorCallback?: PositionErrorCallback,
) {
  const [position, setPosition] = useState<Position>();

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      setPosition,
      undefined,
      options,
    );
    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, [options]);

  return position;
}
