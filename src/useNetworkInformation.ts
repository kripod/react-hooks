import { useEffect, useState } from 'react';
import { canUseDOM, managedEventListener } from './utils';

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
