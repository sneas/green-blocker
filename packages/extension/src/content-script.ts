import { registerContentScript } from '@green-blocker/content-script';
import { isInTheList } from '@green-blocker/extension-messages';

const startTheBlocker = async () => {
  const actualVisibility = document.documentElement.style.visibility;
  document.documentElement.style.visibility = 'hidden';

  console.log(window.location.host);

  const shouldBeApplied = await isInTheList(window.location);

  console.log('Should be applied', shouldBeApplied);

  if (!shouldBeApplied) {
    console.log('is not in the list');
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
