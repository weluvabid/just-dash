import { isArray } from "../common/utils";

export const falsySet = new Set([false, 0, '', null, undefined, NaN]);

export const compactValidators = [
  (input) => {
    if (!isArray(input)) {
      throw new Error('Input must be an array');
    }
        
    return true;
  }
];
