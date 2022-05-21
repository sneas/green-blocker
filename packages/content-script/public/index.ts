import { registerContentScript } from '../src';

registerContentScript({
  api: {
    saveToExtensionStorage: (item) => {
      window.localStorage.setItem(item.key, item.value);
      return Promise.resolve();
    },
    loadFromExtensionStorage: (key) => {
      return Promise.resolve(window.localStorage.getItem(key) ?? undefined);
    },
  },
  location: window.location,
}).then();
