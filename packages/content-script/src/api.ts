import {
  saveToExtensionStorage,
  loadFromExtensionStorage,
} from '@green-blocker/extension-messages';

export const api = {
  saveToExtensionStorage,
  loadFromExtensionStorage,
};

export type ApiConfigOptions = Partial<typeof api>;

export const configureApi = (options: Partial<ApiConfigOptions>) => {
  Object.assign(api, options);
};
