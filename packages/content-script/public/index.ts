import { registerContentScript } from '../src';

const unblockUntilKey = 'green-blocker.unblock_until';

registerContentScript({
  api: {
    unblock: (minutes) => {
      window.localStorage.setItem(unblockUntilKey, minutes.toString());
      return Promise.resolve();
    },
    shouldBeBlocked: () => {
      return Promise.resolve(
        parseInt(window.localStorage.getItem(unblockUntilKey) ?? '0') <=
          new Date().getTime()
      );
    },
  },
}).then();
