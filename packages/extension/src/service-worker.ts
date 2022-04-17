import {
  LocationUrl,
  onAddToTheListRequest,
  onIsInTheListRequest,
  onRemoveFromTheListRequest,
} from '@green-blocker/extension-messages';

type BlockItem = {
  host: string;
};
let blockItems: BlockItem[] = [];

chrome.storage.sync.get(['blockItems'], (values) => {
  blockItems = JSON.parse(values['blockItems'] ?? '[]');
  console.log('Block Items', blockItems);
});

const isBlocked = (location: LocationUrl) =>
  blockItems.some((blockItem) => blockItem.host === location.host);

onIsInTheListRequest(async (sendResponse, location) => {
  return sendResponse(isBlocked(location));
});

onAddToTheListRequest(async (sendResponse, location) => {
  if (isBlocked(location)) {
    return;
  }

  blockItems = [
    ...blockItems,
    {
      host: location.host,
    },
  ];

  await chrome.storage.sync.set({
    blockItems: JSON.stringify(blockItems),
  });
});

onRemoveFromTheListRequest(async (sendResponse, location) => {
  if (!isBlocked(location)) {
    return;
  }

  blockItems = blockItems.filter(
    (blockItem) => blockItem.host !== location.host
  );

  await chrome.storage.sync.set({
    blockItems: JSON.stringify(blockItems),
  });
});
