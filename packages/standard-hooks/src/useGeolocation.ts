import { useEffect, useState } from 'react';

/**
 * Tracks geolocation of the device.
 *
 * @param options Additional watching options.
 *
 * @returns {Position | undefined} An instance of `Position`, or `undefined` when data cannot be obtained.
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
