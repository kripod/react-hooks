import { useEffect, useState } from 'react';
import { canUseDOM, eventListenerEffect } from './utils';

export default function useNetworkAvailability() {
  const [online, setOnline] = useState(canUseDOM ? navigator.onLine : true);

  useEffect(() => {
    const destructors = [
      eventListenerEffect(window, 'offline', () => {
        setOnline(false);
      }),
      eventListenerEffect(window, 'online', () => {
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
