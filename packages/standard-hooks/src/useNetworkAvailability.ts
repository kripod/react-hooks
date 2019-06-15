import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

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
