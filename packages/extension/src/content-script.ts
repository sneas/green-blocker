import { registerContentScript } from '@green-blocker/content-script';

document.documentElement.style.visibility = 'hidden';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    registerContentScript();
    document.documentElement.style.visibility = '';
  },
  false
);
