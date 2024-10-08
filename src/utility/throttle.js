import { isNumber } from "../common/utils";
import withValidator from "../common/with-validator";

import { DEFAULT_THROTTLE_OPTIONS, throttleValidators } from "./throttle.constants";

function throttle(fn, options) {
  let timer = null;
  let mergedOptions = { ...DEFAULT_THROTTLE_OPTIONS };

  if (isNumber(options)) {
    mergedOptions.delay = options;
  } else {
    mergedOptions = { ...mergedOptions, ...options };
  }

  function throttleWrapper(...args) {
    let result = undefined;

    if (!timer) { 
      if (mergedOptions.leading) {
        result = fn(...args);
      }

      timer = globalThis.setTimeout(() => {
        globalThis.clearTimeout(timer);
    
        timer = null;

        if (mergedOptions.trailing) {
          mergedOptions.callback(fn(...args));
        }
      }, mergedOptions.delay);
    }

    return result;
  }

  throttleWrapper.cancel = () => {
    globalThis.clearTimeout(timer);

    timer = null;
  };

  return throttleWrapper;
}

export default withValidator(throttle, throttleValidators);
