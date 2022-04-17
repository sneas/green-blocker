import { onIsInTheListRequest } from '@green-blocker/extension-messages';

const notAllowedHosts = [
  'www.reddit.com',
  '9gag.com',
  'pikabu.ru',
  'www.linkedin.com',
];

onIsInTheListRequest(async (sendResponse, location) => {
  return sendResponse(notAllowedHosts.includes(location.host));
});
