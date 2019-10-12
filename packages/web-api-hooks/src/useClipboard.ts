export default function useClipboard() {
  const checkForPermission = (type: PermissionName): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!navigator.permissions) {
        resolve('Permission granted.');
      } else {
        navigator.permissions
          .query({
            name: type,
          })

          /* Permission API is still a working draft, and Typescript types for it
          are still not correct, hence 'any' type as an argument. Similar situation
          in lines where checkForPermission function is invoked. */
          .then((permissionStatus: any) => {
            // Will be 'granted', 'denied' or 'prompt':
            if (permissionStatus.state === 'granted') {
              resolve('Permission granted.');
            } else {
              reject('Permission deined'); // eslint-disable-line
            }
          })
          .catch(error => reject(error));
      }
    });
  };

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
    checkForPermission('clipboard-read' as PermissionName)
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
