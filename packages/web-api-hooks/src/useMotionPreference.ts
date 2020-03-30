import useMedia from './useMedia';

/**
 * Tracks motion intensity preference of the user.
 *
 * @returns Preferred motion intensity.
 *
 * @example
 * function Component() {
 *   const preferReducedMotion = useMotionPreference() === 'reduce';
 *   // ...
 * }
 */
export default function useMotionPreference(): 'no-preference' | 'reduce' {
  const isReduce = useMedia('(prefers-reduced-motion: reduce)');

  if (isReduce) return 'reduce';
  return 'no-preference';
}
