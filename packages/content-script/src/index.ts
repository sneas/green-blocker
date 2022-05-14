import './index.scss';

export const registerContentScript = async () => {
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

  const storageItemName = 'green-blocker.unblock_until';

  const getUnblockUntil = (): number =>
    parseInt(localStorage.getItem(storageItemName) ?? '0');

  const shouldBeBlocked = () => getUnblockUntil() <= new Date().getTime();

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
    setTimeout(() => {
      if (shouldBeBlocked() && !isBlockVisible()) {
        showBlock();
      } else if (!shouldBeBlocked() && isBlockVisible()) {
        hideBlock();
      }

      checkSoon();
    }, 5000);
  };

  if (shouldBeBlocked()) {
    showBlockNow();
  }

  checkSoon();

  const allow = (minutes: number) => () => {
    const newUnblockUntil = new Date().getTime() + minutes * 60 * 1000;
    localStorage.setItem(storageItemName, newUnblockUntil.toString());
    hideBlock();
  };

  button1Min.addEventListener('click', allow(1));
  button15Min.addEventListener('click', allow(15));
  button60Min.addEventListener('click', allow(60));
};
