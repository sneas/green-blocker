import './index.scss';
import { ApiConfigOptions, configureApi, api } from './api';
import { LocationUrl } from '@green-blocker/extension-messages';

type RegisterContentScriptOptions = {
  api: ApiConfigOptions;
  location: LocationUrl;
};

export const registerContentScript = async (
  { api: apiOptions, location }: RegisterContentScriptOptions = {
    api: {},
    location: window.location,
  }
) => {
  configureApi(apiOptions);

  const block = document.createElement('div');
  block.classList.add('green-blocker');

  const blockContent = document.createElement('div');
  blockContent.classList.add('green-blocker_content');

  const button1Min = document.createElement('button');
  button1Min.innerText = `Allow for 1 minute`;
  button1Min.classList.add('green-blocker_button');

  const button15Min = document.createElement('button');
  button15Min.innerText = `Allow for 15 minutes`;
  button15Min.classList.add('green-blocker_button');

  const button60Min = document.createElement('button');
  button60Min.innerText = `Allow for 1 hour`;
  button60Min.classList.add('green-blocker_button');

  blockContent.append(button1Min);
  blockContent.append(button15Min);
  blockContent.append(button60Min);

  block.append(blockContent);

  const storageItemName = `unblock_until-${location.host}`;

  const getUnblockUntil = async (): Promise<number> =>
    parseInt((await api.loadFromExtensionStorage(storageItemName)) ?? '0');

  const shouldBeBlocked = async (): Promise<boolean> =>
    (await getUnblockUntil()) <= new Date().getTime();

  const prependBlock = () => {
    if (document.body) {
      document.body.prepend(block);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.prepend(block);
      });
    }
  };

  const showBlockNow = () => {
    block.classList.remove('green-blocker--hidden');
    prependBlock();
  };

  const showBlock = () => {
    block.classList.add('green-blocker--hidden');
    prependBlock();
    setTimeout(() => {
      block.classList.remove('green-blocker--hidden');
    }, 500);
  };

  const isBlockVisible = () => {
    return !block.classList.contains('green-blocker--hidden');
  };

  const hideBlock = () => {
    block.classList.add('green-blocker--hidden');
    setTimeout(() => {
      document.body.contains(block) && document.body.removeChild(block);
    }, 500);
  };

  const checkSoon = () => {
    setTimeout(async () => {
      if ((await shouldBeBlocked()) && !isBlockVisible()) {
        showBlock();
      } else if (!(await shouldBeBlocked()) && isBlockVisible()) {
        hideBlock();
      }

      checkSoon();
    }, 5000);
  };

  if (await shouldBeBlocked()) {
    showBlockNow();
  }

  checkSoon();

  const allow = (minutes: number) => async () => {
    const newUnblockUntil = new Date().getTime() + minutes * 60 * 1000;
    await api.saveToExtensionStorage({
      key: storageItemName,
      value: newUnblockUntil.toString(),
    });
    hideBlock();
  };

  button1Min.addEventListener('click', allow(1));
  button15Min.addEventListener('click', allow(15));
  button60Min.addEventListener('click', allow(60));
};
