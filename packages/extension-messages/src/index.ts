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

export const [
  getIsUnblockAllWithSingleClick,
  onGetIsUnblockAllWithSingleClickRequest,
] = createScopedMessage<void, boolean>('isUnblockAllWithSingleClick');

export const [
  setIsUnblockAllWithSingleClick,
  onSetIsUnblockAllWithSingleClick,
] = createScopedMessage<boolean, void>('setUnblockAllWithSingleClick');

type UnblockOptions = {
  minutes: number;
  url: LocationUrl; // instead of host, let's pass LocationUrl object. Which is a subset of windows.location
}

export const [unblock, onUnblockRequest] = createScopedMessage<UnblockOptions, void>(
  'unblock'
);

export const [shouldBeBlocked, onShouldBeBlockedRequest] = createScopedMessage<
  LocationUrl,
  boolean
>('shouldBeBlocked');
