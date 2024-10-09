import { hasOwnProperty, isBoolean, isFunction, isNumber, isObject } from "../common/utils";

export const debounceValidators = [
  (input) => {
    if (!isFunction(input)) {
      throw new Error('executor must be a function');
    }

    return true;
  },
  (input) => {
    if (!isObject(input) && !isNumber(input)) {
      throw new Error('options must be an object or a number');
    }

    if (isObject(input)) {
      if (hasOwnProperty(input, 'delay') && !isNumber(input.delay)) {
        throw new Error('options.delay must be a number');
      }

      if (hasOwnProperty(input, 'leading') && !isBoolean(input.leading)) {
        throw new Error('options.leading must be a boolean');
      }

      if (hasOwnProperty(input, 'trailing') && !isBoolean(input.trailing)) {
        throw new Error('options.trailing must be a boolean');
      }

      if (hasOwnProperty(input, 'callback') && !isFunction(input.callback)) {
        throw new Error('options.callback must be a function');
      }

      if (hasOwnProperty(input, 'maxDelay') && !isNumber(input.maxDelay)) {
        throw new Error('options.maxDelay must be a number');
      }
    }

    return true;
  }
];

export const DEFAULT_DEBOUNCE_OPTIONS = Object.freeze({
  delay: 0,
  maxDelay: undefined,
  trailing: true,
  leading: false,
  callback: () => {}
});

export const UNDEFINED_SYM = Symbol('UNDEFINED_SYM');
