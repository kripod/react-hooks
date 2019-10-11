export default interface VisualViewport extends EventTarget {
  readonly offsetLeft: number;
  readonly offsetTop: number;

  readonly pageLeft: number;
  readonly pageTop: number;

  readonly width: number;
  readonly height: number;

  readonly scale: number;

  onresize: EventListener;
  onscroll: EventListener;
}

declare global {
  interface Window {
    readonly visualViewport: VisualViewport;
  }
}
