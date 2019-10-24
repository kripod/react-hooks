import useMedia from './useMedia';

/**
 * Tracks motion intensity preference of the user.
 *
 * @returns Preferred motion intensity.
 *
 * @example
 * function Component() {
 *   const preferReducedMotion = usePreferredMotionIntensity() === 'reduce';
 *   // ...
 * }
 */
export default function usePreferredMotionIntensity():
  | 'no-preference'
  | 'reduce' {
  const isReduce = useMedia('(prefers-reduced-motion: reduce)');

  if (isReduce) return 'reduce';
  return 'no-preference';
}
