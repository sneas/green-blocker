import {
  addToTheList,
  isInTheList,
  LocationUrl,
  removeFromTheList,
} from '@green-blocker/extension-messages';

const hostCheckbox = document.getElementById('thisHost') as HTMLInputElement;
const refreshContainer = document.getElementById('refreshContainer');
const refreshButton = document.getElementById('refreshButton');

chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const currentTab = tabs[0];
  const url = new URL(currentTab.url);
  const locationUrl: LocationUrl = {
    host: url.host,
  };
  if (await isInTheList(locationUrl)) {
    hostCheckbox.checked = true;
  }

  hostCheckbox.addEventListener('change', async () => {
    refreshContainer.classList.remove('hidden');

    if (hostCheckbox.checked) {
      await addToTheList(locationUrl);
    } else {
      await removeFromTheList(locationUrl);
    }
  });
});

refreshButton.addEventListener('click', () => {
  chrome.tabs.reload();
});
