import { isArray } from "../common/utils";

export const flattenDeepValidators = [
  (input) => {
    if (!isArray(input)) {
      throw new Error('Input must be an array');
    }

    return true;
  }
];
