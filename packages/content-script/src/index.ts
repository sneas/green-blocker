import './index.scss';

export const registerContentScript = async () => {
  const block = document.createElement('div');
  block.classList.add('green-blocker');

  const blockText = document.createElement('div');
  blockText.classList.add('green-blocker_paragraph');
  blockText.innerText = `We don't need this shit.`;

  const showButton = document.createElement('button');
  showButton.innerText = `I still wanna see it.`;
  showButton.classList.add('green-blocker_button');

  block.append(blockText, showButton);

  document.body.appendChild(block);

  showButton.addEventListener('click', () => {
    block.remove();
  });
};
