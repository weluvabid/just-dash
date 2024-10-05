export const mergeValidators = [
  (input) => {
    if (!(input instanceof WeakSet)) {
      throw new Error('seen must be a WeakSet');
    }

    return true;
  },
  () => true
];
