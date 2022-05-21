import { LocationUrl } from '@green-blocker/extension-messages';
import { Result } from './result';

export const getCurrentUrl = (): Promise<Result<LocationUrl>> => {
  return new Promise<Result<LocationUrl>>((resolve) => {
    if (!chrome || !chrome.tabs) {
      resolve({
        success: false,
        reason: 'chrome.tabs can not be found',
      });

      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const currentTab = tabs[0];
      if (!currentTab.url) {
        resolve({
          success: false,
          reason: 'Unavailable URL.',
          extra: currentTab,
        });

        return;
      }

      const url = new URL(currentTab.url);
      resolve({
        success: true,
        value: {
          host: url.host,
        },
      });
    });
  });
};
