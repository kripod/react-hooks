import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks information about the device's network connection.
 *
 * ⚗️ _The underlying technology is experimental. Please be aware about browser compatibility before using this in production._
 *
 * @returns A [`NetworkInformation`](https://developer.mozilla.org/docs/Web/API/NetworkInformation) instance, or `undefined` when data is unavailable.
 *
 * @example
 * const Example = () => {
 *   const { effectiveType, downlink, rtt, saveData } = useNetworkInformation();
 *   // ...
 * };
 */
export default function useNetworkInformation():
  | NetworkInformation
  | undefined {
  const [networkInformation, setNetworkInformation] = useState(
    canUseDOM ? navigator.connection : undefined,
  );

  useEffect(
    () =>
      navigator.connection
        ? managedEventListener(navigator.connection, 'change', () => {
            setNetworkInformation(navigator.connection);
          })
        : undefined,
    [],
  );

  return networkInformation;
}
