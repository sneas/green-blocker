type BlockItem = {
  host: string;
};

let blockItemsCache: BlockItem[] | null = null;

export const loadBlockItems = async (): Promise<BlockItem[]> => {
  if (blockItemsCache !== null) {
    return blockItemsCache;
  }

  return new Promise((resolve) => {
    chrome.storage.sync.get(['blockItems'], (values) => {
      blockItemsCache = JSON.parse(values['blockItems'] ?? '[]');
      resolve(blockItemsCache);
    });
  });
};

export const saveBlockItems = async (blockItems: BlockItem[]) => {
  blockItemsCache = blockItems;
  await chrome.storage.sync.set({
    blockItems: JSON.stringify(blockItems),
  });
};
