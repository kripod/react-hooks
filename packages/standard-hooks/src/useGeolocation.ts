import { useEffect, useState } from 'react';

/**
 * Tracks geolocation of the device.
 *
 * @param options Additional watching options.
 * @param errorCallback Method to execute in case of an error.
 *
 * @returns {Position | undefined} An instance of `Position`, or `undefined` when data is unavailable.
 * @see [`Position`](https://developer.mozilla.org/docs/Web/API/Position)
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
  errorCallback?: PositionErrorCallback,
) {
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
