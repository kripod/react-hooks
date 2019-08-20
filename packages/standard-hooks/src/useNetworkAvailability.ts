import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks information about the network's availability.
 *
 * ⚠️ _This attribute is [inherently unreliable](https://html.spec.whatwg.org/multipage/offline.html#navigator.online). A computer can be connected to a network without having internet access._
 *
 * @returns `false` if the user agent is definitely offline, or `true` if the user agent might be online.
 *
 * @example
 * const Example = () => {
 *   const isOnline = useNetworkAvailability();
 *   // ...
 * };
 */
export default function useNetworkAvailability() {
  const [online, setOnline] = useState(canUseDOM ? navigator.onLine : true);

  useEffect(() => {
    const destructors = [
      managedEventListener(window, 'offline', () => {
        setOnline(false);
      }),
      managedEventListener(window, 'online', () => {
        setOnline(true);
      }),
    ];

    return () => {
      destructors.forEach(fn => {
        fn();
      });
    };
  }, []);

  return online;
}
