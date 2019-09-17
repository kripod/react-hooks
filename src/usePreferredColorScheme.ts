import useMedia from './useMedia';

/**
 * Tracks color scheme preference.
 *
 * @returns {'light' | 'dark' | 'no-preference'} preferred color scheme
 *
 * @example
 * function Example() {
 *   const const preferredColorScheme = usePreferredColorScheme();
 *   const isDarkMode = usePreferredColorScheme() === 'dark';
 *   // ...
 * }
 */
export default function usePreferredColorScheme():
  | 'dark'
  | 'light'
  | 'no-preference' {
  const isLight = useMedia('(prefers-color-scheme: light)');
  const isDark = useMedia('(prefers-color-scheme: dark)');

  if (isLight) return 'light';
  if (isDark) return 'dark';
  return 'no-preference';
}
