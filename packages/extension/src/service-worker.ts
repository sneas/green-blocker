import {
  LocationUrl,
  onAddToTheListRequest,
  onIsInTheListRequest,
  onRemoveFromTheListRequest,
  onSaveToExtensionStorage,
  onLoadFromExtensionStorage,
} from '@green-blocker/extension-messages';
import { loadBlockItems, saveBlockItems } from './service-worker/block-items';

const isInBlockList = async (location: LocationUrl): Promise<boolean> => {
  return (await loadBlockItems()).some(
    (blockItem) => blockItem.host === location.host
  );
};

onIsInTheListRequest(async (sendResponse, location) => {
  return sendResponse(await isInBlockList(location));
});

onAddToTheListRequest(async (sendResponse, location) => {
  if (await isInBlockList(location)) {
    return;
  }

  const blockItems = [
    ...(await loadBlockItems()),
    {
      host: location.host,
    },
  ];

  await saveBlockItems(blockItems);
});

onRemoveFromTheListRequest(async (sendResponse, location) => {
  if (!(await isInBlockList(location))) {
    return;
  }

  await saveBlockItems(
    (
      await loadBlockItems()
    ).filter((blockItem) => blockItem.host !== location.host)
  );
});

onSaveToExtensionStorage(async (sendResponse, data) => {
  await chrome.storage.local.set({
    [data.key]: data.value,
  });

  return sendResponse(null);
});

onLoadFromExtensionStorage(async (sendResponse, key) => {
  const result = await chrome.storage.local.get(key);
  return sendResponse(result[key]);
});
