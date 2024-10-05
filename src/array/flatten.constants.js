import { isArray } from "../common/utils";

export const flattenValidators = [
  (input) => {
    if (!isArray(input)) {
      throw new Error('Input must be an array');
    }

    return true;
  }
];
