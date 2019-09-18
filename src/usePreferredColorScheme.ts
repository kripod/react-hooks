import useMedia from './useMedia';

/**
 * Tracks color scheme preference of the user.
 *
 * @returns Preferred color scheme.
 *
 * @example
 * function Example() {
 *   const preferredColorScheme = usePreferredColorScheme();
 *   const isDarkMode = usePreferredColorScheme() === 'dark';
 *   // ...
 * }
 */
export default function usePreferredColorScheme():
  | 'no-preference'
  | 'light'
  | 'dark' {
  const isLight = useMedia('(prefers-color-scheme: light)');
  const isDark = useMedia('(prefers-color-scheme: dark)');

  if (isLight) return 'light';
  if (isDark) return 'dark';
  return 'no-preference';
}
