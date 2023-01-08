import { registerContentScript } from '@green-blocker/content-script';
import { isInTheList } from '@green-blocker/extension-messages';

const startTheBlocker = async () => {
  const actualVisibility = document.documentElement.style.visibility;
  document.documentElement.style.visibility = 'hidden';

  const shouldBeApplied = await isInTheList(window.location);

  if (!shouldBeApplied) {
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

const observer = new MutationObserver(() => {
  if (!document.body) {
    return;
  }
  observer.disconnect();

  startTheBlocker().then();
});
observer.observe(document.documentElement, {
  attributes: false,
  childList: true,
  subtree: false,
});
