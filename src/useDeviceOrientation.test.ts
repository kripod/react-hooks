import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useDeviceOrientation } from '.';

// TODO: Remove this polyfill
class DeviceOrientationEvent extends Event {
  readonly alpha: number | null;

  readonly beta: number | null;

  readonly gamma: number | null;

  readonly absolute: boolean;

  constructor(type: string, eventInitDict?: DeviceOrientationEventInit) {
    super(type, eventInitDict);

    if (eventInitDict) {
      this.alpha =
        eventInitDict.alpha !== undefined ? eventInitDict.alpha : null;
      this.beta = eventInitDict.beta !== undefined ? eventInitDict.beta : null;
      this.gamma =
        eventInitDict.gamma !== undefined ? eventInitDict.gamma : null;
      this.absolute = eventInitDict.absolute || false;
    } else {
      this.alpha = null;
      this.beta = null;
      this.gamma = null;
      this.absolute = false;
    }
  }
}

test('device lying flat on a horizontal surface with the top of the screen pointing west', () => {
  const { result } = renderHook(() => useDeviceOrientation());
  expect(result.current.alpha).toBe(null);

  const eventArgs = {
    alpha: 90,
    beta: 0,
    gamma: 0,
  };
  act(() => {
    fireEvent(
      window,
      new DeviceOrientationEvent('deviceorientation', eventArgs),
    );
  });
  expect(result.current).toMatchObject(eventArgs);
});
