import { checkForPermission } from './utils';

  const cut = (element: HTMLInputElement) => {
    checkForPermission('clipboard-write' as PermissionName)
      .then(() => {
        element.select();
        document.execCommand('cut');
        element.value = '';
        element.blur();
      })
      .catch((error: string) => console.error(error));
  };

  const paste = (element: HTMLInputElement) => {
    checkForPermission('clipboard-read' as PermissionName)
      .then(() => {
        element.focus();
        document.execCommand('paste');
      })
      .catch((error: string) => console.error(error));
  };

  const copy = (text: string) => {
    checkForPermission('clipboard-write' as PermissionName)
      .then(() => {
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
      })
      .catch((error: string) => console.error(error));
  };
  return {
    copy,
    cut,
    paste,
  };
}
