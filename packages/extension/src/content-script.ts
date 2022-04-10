import { registerContentScript } from '@green-blocker/content-script';

const notAllowedHosts = ['www.reddit.com', '9gag.com', 'pikabu.ru'];

const startTheBlocker = () => {
  const actualVisibility = document.documentElement.style.visibility;
  document.documentElement.style.visibility = 'hidden';

  if (!notAllowedHosts.includes(location.host)) {
    document.documentElement.style.visibility = actualVisibility;
    return;
  }

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      registerContentScript();
      document.documentElement.style.visibility = actualVisibility;
    },
    false
  );
};

startTheBlocker();
