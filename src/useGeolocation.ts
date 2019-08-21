import { useEffect, useState } from 'react';

/**
 * Tracks geolocation of the device.
 *
 * @param options Additional watching options.
 * @param errorCallback Method to execute in case of an error, e.g. when the user refuses location sharing permissions.
 * @returns A [`Position`](https://developer.mozilla.org/docs/Web/API/Position) instance, or `undefined` when data is unavailable.
 *
 * @example
 * const Example = () => {
 *   const geolocation = useGeolocation();
 *   if (geolocation) {
 *     // ...
 *   }
 * };
 */
export default function useGeolocation(
  options?: PositionOptions,
  errorCallback?: (error: PositionError) => void,
): Position | undefined {
  const [position, setPosition] = useState<Position>();

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      setPosition,
      errorCallback,
      options,
    );
    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, [errorCallback, options]);

  return position;
}
