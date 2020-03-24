/* eslint consistent-return: 0 */
/* eslint no-param-reassign: 0 */
import { checkForPermission } from './utils';

export default function useClipboard() {
  const cut = async (
    element: HTMLInputElement,
    permissionErrorCallback: Function = () => {},
  ): Promise<void | Error> => {
    const permissionGranted = await checkForPermission(
      'clipboard-write' as PermissionName,
      permissionErrorCallback,
    );
    try {
      if (permissionGranted) {
        element.select();
        document.execCommand('cut');
        element.value = '';
        element.blur();
      }
    } catch (error) {
      return error;
    }
  };

  const paste = async (
    element: HTMLInputElement,
    permissionErrorCallback: Function = () => {},
  ): Promise<void | Error> => {
    const permissionGranted = await checkForPermission(
      'clipboard-read' as PermissionName,
      permissionErrorCallback,
    );
    try {
      if (permissionGranted) {
        element.focus();
        document.execCommand('paste');
      }
    } catch (error) {
      return error;
    }
  };

  const copy = async (
    text: string,
    permissionErrorCallback: Function = () => {},
  ): Promise<void | Error> => {
    const permissionGranted = await checkForPermission(
      'clipboard-write' as PermissionName,
      permissionErrorCallback,
    );
    try {
      if (permissionGranted) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text);
        } else {
          const tempInput = document.createElement('input');
          document.body.appendChild(tempInput);
          tempInput.setAttribute('id', 'temp-input');
          (document.getElementById(
            'temp-input',
          ) as HTMLInputElement).value = text;
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
      }
    } catch (error) {
      return error;
    }
  };
  return {
    copy,
    cut,
    paste,
  };
}
