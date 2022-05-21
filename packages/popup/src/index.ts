import './styles.scss';
import {
  addToTheList,
  isInTheList,
  removeFromTheList,
} from '@green-blocker/extension-messages';
import { getCurrentUrl } from './app/url';

const hostCheckbox = document.getElementById('thisHost') as HTMLInputElement;
const refreshButton = document.getElementById('refreshButton');

const runTheApp = async () => {
  const getUrlResult = await getCurrentUrl();

  if (!getUrlResult.success) {
    document.getElementById('unavailable').classList.remove('d-none');
    return;
  }

  const locationUrl = getUrlResult.value;
  let isChecked: boolean;
  try {
    hostCheckbox.checked = await isInTheList(locationUrl);
  } catch (e) {
    document.getElementById('unavailable').classList.remove('d-none');
    return;
  }

  setTimeout(() => {
    document.getElementById('thisHostWrapper').classList.add('opacity-100');
  }, 100);

  hostCheckbox.addEventListener('change', async () => {
    refreshButton.classList.remove('invisible');
    refreshButton.classList.add('opacity-100');

    if (hostCheckbox.checked) {
      await addToTheList(locationUrl).catch(() => null);
    } else {
      await removeFromTheList(locationUrl).catch(() => null);
    }
  });
};

runTheApp().then();

refreshButton.addEventListener('click', () => {
  chrome.tabs.reload();
});
