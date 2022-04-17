import { createMessage } from '@green-blocker/hermes';

const createScope =
  (scope: string): typeof createMessage =>
  (identifier: string) =>
    createMessage(`${scope}.${identifier}`);

const createScopedMessage = createScope('green-blocker');

export const [isInTheList, onIsInTheListRequest] = createScopedMessage<
  Location,
  boolean
>('isInTheList');
