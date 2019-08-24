import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useDeviceMotion } from '.';

// TODO: Remove this polyfill
class DeviceMotionEvent extends Event {
  readonly acceleration: DeviceMotionEventAcceleration | null;

  readonly accelerationIncludingGravity: DeviceMotionEventAcceleration | null;

  readonly rotationRate: DeviceMotionEventRotationRate | null;

  readonly interval: number;

  constructor(type: string, eventInitDict?: DeviceMotionEventInit) {
    super(type, eventInitDict);

    if (eventInitDict) {
      this.acceleration = {
        x: null,
        y: null,
        z: null,
        ...eventInitDict.acceleration,
      };
      this.accelerationIncludingGravity = {
        x: null,
        y: null,
        z: null,
        ...eventInitDict.accelerationIncludingGravity,
      };
      this.rotationRate = {
        alpha: null,
        beta: null,
        gamma: null,
        ...eventInitDict.rotationRate,
      };
      this.interval = eventInitDict.interval || 0;
    } else {
      this.acceleration = null;
      this.accelerationIncludingGravity = null;
      this.rotationRate = null;
      this.interval = 0;
    }
  }
}

test('device lying flat on a horizontal surface with the screen upmost', () => {
  const { result } = renderHook(() => useDeviceMotion());
  expect(result.current.acceleration).toBe(null);

  const eventArgs = {
    acceleration: { x: 0, y: 0, z: 0 },
    accelerationIncludingGravity: { x: 0, y: 0, z: 9.81 },
    rotationRate: { alpha: 0, beta: 0, gamma: 0 },
    interval: 16,
  };
  act(() => {
    fireEvent(window, new DeviceMotionEvent('devicemotion', eventArgs));
  });
  expect(result.current).toMatchObject(eventArgs);
});
