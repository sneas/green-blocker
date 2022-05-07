import {
  LocationUrl,
  onAddToTheListRequest,
  onIsInTheListRequest,
  onRemoveFromTheListRequest,
} from '@green-blocker/extension-messages';
import { loadBlockItems, saveBlockItems } from './service-worker/block-items';

const isBlocked = async (location: LocationUrl): Promise<boolean> => {
  return (await loadBlockItems()).some(
    (blockItem) => blockItem.host === location.host
  );
};

onIsInTheListRequest(async (sendResponse, location) => {
  return sendResponse(await isBlocked(location));
});

onAddToTheListRequest(async (sendResponse, location) => {
  if (await isBlocked(location)) {
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
  if (!(await isBlocked(location))) {
    return;
  }

  await saveBlockItems(
    (
      await loadBlockItems()
    ).filter((blockItem) => blockItem.host !== location.host)
  );
});
