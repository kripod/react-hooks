import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks information about the device's network connection.
 *
 * ⚗️ _The underlying technology is experimental. Please be aware about browser compatibility before using this in production._
 *
 * @returns {NetworkInformation | undefined} An instance of `NetworkInformation`, or `undefined` when data is unavailable.
 * @see [`NetworkInformation`](https://developer.mozilla.org/docs/Web/API/NetworkInformation)
 *
 * @example
 * const Example = () => {
 *   const { effectiveType, downlink, rtt, saveData } = useNetworkInformation();
 *   // ...
 * };
 */
export default function useNetworkInformation() {
  const [networkInformation, setNetworkInformation] = useState(
    canUseDOM ? navigator.connection : undefined,
  );

  useEffect(
    () =>
      navigator.connection
        ? managedEventListener(navigator.connection, 'change', () => {
            setNetworkInformation(navigator.connection);
          })
        : () => {},
    [],
  );

  return networkInformation;
}
