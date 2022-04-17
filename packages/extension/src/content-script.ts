import { registerContentScript } from '@green-blocker/content-script';
import { isInTheList } from '@green-blocker/extension-messages';

const startTheBlocker = async () => {
  const actualVisibility = document.documentElement.style.visibility;
  document.documentElement.style.visibility = 'hidden';

  if (!(await isInTheList(window.location))) {
    document.documentElement.style.visibility = actualVisibility;
    return;
  }

  const register = () => {
    registerContentScript();
    document.documentElement.style.visibility = actualVisibility;
  };

  if (!document.body) {
    document.addEventListener('DOMContentLoaded', register, false);
  } else {
    register();
  }
};

startTheBlocker();
