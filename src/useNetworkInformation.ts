import { useEffect, useState } from 'react';
import { canUseDOM, eventListenerEffect } from './utils';

export default function useNetworkInformation() {
  const [networkInformation, setNetworkInformation] = useState(
    canUseDOM ? navigator.connection : undefined,
  );

  useEffect(
    () =>
      navigator.connection
        ? eventListenerEffect(navigator.connection, 'change', () => {
            setNetworkInformation(navigator.connection);
          })
        : () => {},
    [],
  );

  return networkInformation;
}
