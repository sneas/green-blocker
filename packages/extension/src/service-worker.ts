import {
  LocationUrl,
  onAddToTheListRequest,
  onIsInTheListRequest,
  onRemoveFromTheListRequest,
  onUnblockRequest,
  onShouldBeBlockedRequest,
  onGetIsUnblockAllWithSingleClickRequest,
} from '@green-blocker/extension-messages';
import { loadBlockItems, saveBlockItems } from './service-worker/block-items';
import { isUnblockAllWithSingleClickEnabled } from './service-worker/unblock-all-with-single-click';

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

const unblockUntilStorageItemName = 'unblock_until';

onUnblockRequest(async (sendResponse, minutes) => {
  const newUnblockUntil = new Date().getTime() + minutes * 60 * 1000;
  await chrome.storage.local.set({
    [unblockUntilStorageItemName]: newUnblockUntil,
  });

  return sendResponse(null);
});

onShouldBeBlockedRequest(async (sendResponse) => {
  const result = await chrome.storage.local.get(unblockUntilStorageItemName);
  const unblockedUntil = result[unblockUntilStorageItemName] ?? 0;

  return sendResponse(unblockedUntil <= new Date().getTime());
});

onGetIsUnblockAllWithSingleClickRequest(async (sendResponse) => {
  return sendResponse(await isUnblockAllWithSingleClickEnabled());
});
