import useMedia from './useMedia';

/**
 * Tracks color scheme preference.
 *
 * @returns {'light' | 'dark' | 'no-preference' | null} preferred color scheme
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
  | 'no-preference'
  | null {
  const isLight = useMedia('(prefers-color-scheme: light)');
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const noPreference = useMedia('(prefers-color-scheme: no-preference)');

  if (isLight) return 'light';
  if (isDark) return 'dark';
  if (noPreference) return 'no-preference';
  return null;
}
