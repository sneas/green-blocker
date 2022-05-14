import './styles.scss';
import {
  addToTheList,
  isInTheList,
  LocationUrl,
  removeFromTheList,
} from '@green-blocker/extension-messages';
import { getCurrentUrl } from './app/url';

const hostCheckbox = document.getElementById('thisHost') as HTMLInputElement;
const refreshContainer = document.getElementById('refreshContainer');
const refreshButton = document.getElementById('refreshButton');

const runTheApp = async () => {
  const getUrlResult = await getCurrentUrl();
  const locationUrl: LocationUrl = getUrlResult.success
    ? getUrlResult.value
    : {
        ...window.location,
      };

  if (await isInTheList(locationUrl).catch(() => true)) {
    hostCheckbox.checked = true;
  }

  setTimeout(() => {
    document.getElementById('thisHostWrapper').classList.add('opacity-100');
  }, 100);

  hostCheckbox.addEventListener('change', async () => {
    refreshContainer.classList.remove('hidden');

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
