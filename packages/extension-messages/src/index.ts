import { createMessage } from '@vocably/hermes';

const createScope =
  (scope: string): typeof createMessage =>
  (identifier: string) =>
    createMessage(`${scope}.${identifier}`);

const createScopedMessage = createScope('green-blocker');

export type LocationUrl = {
  host: string;
};

export const [isInTheList, onIsInTheListRequest] = createScopedMessage<
  LocationUrl,
  boolean
>('isInTheList');

export const [addToTheList, onAddToTheListRequest] = createScopedMessage<
  LocationUrl,
  void
>('addToTheList');

export const [removeFromTheList, onRemoveFromTheListRequest] =
  createScopedMessage<LocationUrl, void>('removeFromTheList');

export const [unblock, onUnblockRequest] = createScopedMessage<number, void>(
  'unblock'
);

export const [shouldBeBlocked, onShouldBeBlockedRequest] = createScopedMessage<
  void,
  boolean
>('shouldBeBlocked');

export const [
  getIsUnblockAllWithSingleClick,
  onGetIsUnblockAllWithSingleClickRequest,
] = createScopedMessage<void, boolean>('isUnblockAllWithSingleClick');
