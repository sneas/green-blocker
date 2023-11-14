import './index.scss';
import { ApiConfigOptions, configureApi, api } from './api';

const TIMEOUT = {
  oneMin: 1,
  fifteenMins: 15,
  oneHour: 60,
}

type RegisterContentScriptOptions = {
  api: ApiConfigOptions;
};

export const registerContentScript = async (
  { api: apiOptions }: RegisterContentScriptOptions = {
    api: {},
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
      const shouldBeBlocked = await api.shouldBeBlocked();
      if (shouldBeBlocked && !isBlockVisible()) {
        showBlock();
      } else if (!shouldBeBlocked && isBlockVisible()) {
        hideBlock();
      }

      checkSoon();
    }, 5000);
  };

  if (await api.shouldBeBlocked()) {
    showBlockNow();
  }

  checkSoon();

  const allow = (minutes: number) => async () => {
    api.unblock(minutes).then();
    hideBlock();
  };

  button1Min.addEventListener('click', allow(TIMEOUT.oneMin));
  button15Min.addEventListener('click', allow(TIMEOUT.fifteenMins));
  button60Min.addEventListener('click', allow(TIMEOUT.oneHour));
};
