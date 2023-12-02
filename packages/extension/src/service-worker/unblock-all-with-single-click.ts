export const isUnblockAllWithSingleClickEnabled =
  async (): Promise<boolean> => {
    const result = await chrome.storage.local.get(
      'isUnblockAllWithSingleClick'
    );
    const isUnblockAllWithSingleClick = result['isUnblockAllWithSingleClick'];
    return isUnblockAllWithSingleClick ?? true;
  };
