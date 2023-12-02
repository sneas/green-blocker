import {
  getIsUnblockAllWithSingleClick as getIsUnblockAllWithSingleClickExt,
  setIsUnblockAllWithSingleClick as setIsUnblockAllWithSingleClickExt,
} from '@green-blocker/extension-messages';

let isUnblockAllWithSingleClick: boolean = true;

export const getIsUnblockAllWithSingleClick = async (): Promise<boolean> => {
  if (import.meta.env.PROD) {
    isUnblockAllWithSingleClick = await getIsUnblockAllWithSingleClickExt();
  }

  return isUnblockAllWithSingleClick;
};

export const setUnblockAllWithSingleClick = async (value: boolean) => {
  if (import.meta.env.PROD) {
    return setIsUnblockAllWithSingleClickExt(value);
  }

  isUnblockAllWithSingleClick = value;
};
