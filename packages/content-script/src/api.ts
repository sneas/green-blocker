import { unblock, shouldBeBlocked } from '@green-blocker/extension-messages';

export const api = {
  unblock,
  shouldBeBlocked,
};

export type ApiConfigOptions = Partial<typeof api>;

export const configureApi = (options: Partial<ApiConfigOptions>) => {
  Object.assign(api, options);
};
