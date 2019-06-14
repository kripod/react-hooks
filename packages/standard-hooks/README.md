# standard-hooks 🎣

Essential set of [React Hooks][] for convenient [Web API][] consumption.

[react hooks]: https://reactjs.org/docs/hooks-intro.html
[web api]: https://developer.mozilla.org/docs/Web/API

## Key features

- 🐹 **Bundler-friendly** with tree shaking support
- 📚 **Well-documented** and type-safe interfaces
- 📦 **Self-contained**, free of runtime dependencies

## Reference

- **Sensors**

  - [`useDeviceMotion`](#usedevicemotion)
  - [`useDeviceOrientation`](#usedeviceorientation)
  - [`useDocumentVisibility`](#usedocumentvisibility)
  - [`useMousePosition`](#usemouseposition)
  - [`useNetworkAvailability`](#usenetworkavailability)
  - [`useNetworkInformation`](#usenetworkinformation)
  - [`useWindowScrollPosition`](#usewindowscrollposition)
  - [`useWindowSize`](#usewindowsize)

- **Utilities**
  - [`useEventListener`](#useeventlistener)
  - [`useInterval`](#useinterval)
  - [`useSmoothAnimation`](#usesmoothanimation)

### `useDeviceMotion`

Tracks acceleration and rotation rate of the device. Defaults to an instance of [`DeviceMotionEventInit`](https://w3c.github.io/deviceorientation/#dictdef-devicemotioneventinit).

#### Return value

[`DeviceMotionEvent`](https://developer.mozilla.org/docs/Web/API/DeviceMotionEvent)

#### Usage

```jsx
import { useDeviceMotion } from 'standard-hooks';

const Example = () => {
  const { acceleration, rotationRate, interval } = useDeviceMotion();

  // ...
};
```

### `useDeviceOrientation`

Tracks physical orientation of the device. Defaults to an instance of [`DeviceOrientationEventInit`](https://w3c.github.io/deviceorientation/#dictdef-deviceorientationeventinit).

#### Return value

[`DeviceOrientationEvent`](https://developer.mozilla.org/docs/Web/API/DeviceOrientationEvent)

#### Usage

```jsx
import { useDeviceOrientation } from 'standard-hooks';

const Example = () => {
  const { alpha, beta, gamma, absolute } = useDeviceOrientation();

  // ...
};
```

### `useDocumentVisibility`

Tracks visibility of the page. Defaults to `'visible'`.

#### Return value

[`VisibilityState`](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

#### Usage

```jsx
import { useDocumentVisibility } from 'standard-hooks';

const Example = () => {
  const documentVisibility = useDocumentVisibility();

  // Prefer checking against 'hidden'
  if (documentVisibility === 'hidden') {
    // ...
  }
};
```

### `useMousePosition`

Tracks mouse position. Defaults to `[0, 0]`.

#### Return value

`[x: number, y: number]`

#### Usage

```jsx
import { useMousePosition } from 'standard-hooks';

const Example = () => {
  const [mouseX, mouseY] = useMousePosition();

  // ...
};
```

### `useNetworkAvailability`

Tracks information about the network's availability. Defaults to `true`.

> ⚠️ _This attribute is [inherently unreliable](https://html.spec.whatwg.org/multipage/offline.html#navigator.online). A computer can be connected to a network without having internet access._

#### Return value

`boolean`

#### Usage

```jsx
import { useNetworkAvailability } from 'standard-hooks';

const Example = () => {
  const isOnline = useNetworkAvailability();

  // ...
};
```

### `useNetworkInformation`

Tracks information about the device's network connection. Defaults to `undefined`.

> ⚗️ _The underlying technology is experimental. Please be aware about browser compatibility before using this in production._

#### Return value

[`NetworkInformation`](https://developer.mozilla.org/docs/Web/API/NetworkInformation) | `undefined`

#### Usage

```jsx
import { useNetworkInformation } from 'standard-hooks';

const Example = () => {
  const { effectiveType, downlink, rtt, saveData } = useNetworkInformation();

  // ...
};
```

### `useWindowScrollPosition`

Tracks [`Window`](https://developer.mozilla.org/docs/Web/API/Window) scroll position. Defaults to `[0, 0]`.

> 🚀 _Debounced by [`useSmoothAnimation`](#usesmoothanimation) to improve performance._

#### Return value

`[x: number, y: number]`

#### Usage

```jsx
import { useWindowScrollPosition } from 'standard-hooks';

const Example = () => {
  const [windowScrollX, windowScrollY] = useWindowScrollPosition();

  // ...
};
```

### `useWindowSize`

Tracks [`Window`](https://developer.mozilla.org/docs/Web/API/Window) dimensions. Defaults to `[0, 0]`.

> 🚀 _Debounced by [`useSmoothAnimation`](#usesmoothanimation) to improve performance._

#### Return value

`[width: number, height: number]`

#### Usage

```jsx
import { useWindowSize } from 'standard-hooks';

const Example = () => {
  const [windowWidth, windowHeight] = useWindowSize();

  // ...
};
```

### `useEventListener`

Listens to an [event](https://developer.mozilla.org/en-US/docs/Web/Events) while the enclosing component is mounted.

> ⚠️ _Due to concerns about performance, using this hook is not advised unless event listener creation parameters may vary._

#### Parameters

- `type: string` — Case-sensitive name of event.

- `callback: EventListener` — Method to execute whenever the event fires.

- `target: EventTarget | undefined = canUseDOM ? window : undefined` — Target to listen on, possibly an element or a remote API service.

- `options?: boolean | AddEventListenerOptions` — Additional listener characteristics.

#### Usage

```jsx
import { useEventListener } from 'standard-hooks';

const Example = () => {
  useEventListener('error', () => {
    console.log('A resource failed to load.');
  });

  // ...
};
```

### `useInterval`

Repeatedly calls a function with a fixed time delay between each call.

> 📝 _Timings may be inherently inaccurate, due to the implementation of [`setInterval`](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) under the hood._

#### Parameters

- `callback: () => void` — Method to execute periodically.

- `delayMs: number | null` — Time, in milliseconds, to wait between executions of the specified function. Set to `null` for pausing.

#### Usage

```jsx
import { useInterval } from 'standard-hooks';

const Example = () => {
  useInterval(() => {
    // Custom logic executed in each second
  }, 1000);

  // ...
};
```

### `useSmoothAnimation`

Creates a debounced function using [`requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/Window/requestAnimationFrame).

> 💡 _This hook should be used to avoid framerate drops caused by too frequent state updates._

> ⚠️ _Unmissable events shall not be debounced, as they may not be raised upon every occasion._

#### Parameters

- `callback: (timeStamp: DOMHigh​ResTime​Stamp) => void` — Method to execute only before repaints.

#### Return value

`() => void`

#### Usage

```jsx
import { useSmoothAnimation } from 'standard-hooks';

// Similar to the implementation of `useWindowScrollPosition`
const Example = () => {
  const handleScroll = useSmoothAnimation(() => {
    // ...
  });

  // Scroll events can fire at a high rate
  useEventListener('scroll', handleScroll);

  // ...
};
```
