import './index.scss';

export const registerContentScript = async () => {
  const block = document.createElement('div');
  block.classList.add('green-blocker');

  const blockContent = document.createElement('div');
  blockContent.classList.add('green-blocker_content');

  const blockText = document.createElement('div');
  blockText.classList.add('green-blocker_paragraph');
  blockText.innerText = `We don't need this shit.`;

  const button1Min = document.createElement('button');
  button1Min.innerText = `Allow for 1 minute`;
  button1Min.classList.add('green-blocker_button');

  const button15Min = document.createElement('button');
  button15Min.innerText = `Allow for 15 minutes`;
  button15Min.classList.add('green-blocker_button');

  const button60Min = document.createElement('button');
  button60Min.innerText = `Allow for 1 hour`;
  button60Min.classList.add('green-blocker_button');

  blockContent.append(blockText);
  blockContent.append(button1Min);
  blockContent.append(button15Min);
  blockContent.append(button60Min);

  block.append(blockContent);

  const storageItemName = 'green-blocker.unblock_until';

  let unblockUntil: number = parseInt(
    localStorage.getItem(storageItemName) ?? '0'
  );

  const shouldBeBlocked = () => unblockUntil <= new Date().getTime();

  const showBlock = () => {
    document.body.appendChild(block);
  };

  const hideBlock = () => {
    document.body.removeChild(block);
  };

  const checkSoon = () => {
    setTimeout(() => {
      if (shouldBeBlocked()) {
        showBlock();
      } else {
        checkSoon();
      }
    }, 5000);
  };

  if (shouldBeBlocked()) {
    showBlock();
  } else {
    checkSoon();
  }

  const allow = (minutes: number) => () => {
    unblockUntil = new Date().getTime() + minutes * 60 * 1000;
    localStorage.setItem(storageItemName, unblockUntil.toString());
    hideBlock();
    checkSoon();
  };

  button1Min.addEventListener('click', allow(1));
  button15Min.addEventListener('click', allow(15));
  button60Min.addEventListener('click', allow(60));
};
