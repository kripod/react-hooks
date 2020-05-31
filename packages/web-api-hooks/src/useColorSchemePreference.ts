import useMedia from './useMedia';

/**
 * Tracks color scheme preference of the user.
 *
 * @returns Preferred color scheme.
 *
 * @example
 * function Component() {
 *   const preferDarkMode = useColorSchemePreference() === 'dark';
 *   // ...
 * }
 */
export default function useColorSchemePreference(): 'light' | 'dark' {
  const isDark = useMedia('(prefers-color-scheme: dark)');

  if (isDark) return 'dark';
  return 'light';
}
