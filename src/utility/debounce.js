import { isNumber, isUndefined } from "../common/utils";
import withValidator from "../common/with-validator";

import { DEFAULT_DEBOUNCE_OPTIONS, UNDEFINED_SYM, debounceValidators } from "./debounce.constants";

function debounce(fn, options) {
  let prevArgs = UNDEFINED_SYM;
  let timer = null;
  let maxDelayTimer = null;
  let mergedOptions = { ...DEFAULT_DEBOUNCE_OPTIONS };

  // Merge options or set default delay
  if (isNumber(options)) {
    mergedOptions.delay = options;
  } else {
    mergedOptions = { ...mergedOptions, ...options };
  }

  const getArgsForExecution = (...args) => prevArgs !== UNDEFINED_SYM ? prevArgs : args;

  const executeTrailingCall = (...args) => {
    globalThis.clearTimeout(maxDelayTimer);
    globalThis.clearTimeout(timer);

    timer = null;
    maxDelayTimer = null;

    if (mergedOptions.trailing) {
      mergedOptions.callback(fn(...getArgsForExecution(...args)));
    }
  };

  function debounceWrapper(...args) {
    let result;

    // If there are pending executions, just update prevArgs
    if (timer || maxDelayTimer) {
      prevArgs = args;
    } else {
      if (mergedOptions.leading) {
        result = fn(...getArgsForExecution(...args));

        mergedOptions.callback(result);
      }

      globalThis.clearTimeout(timer);
      globalThis.clearTimeout(maxDelayTimer);

      // Set timeout for the main debounce functionality
      timer = globalThis.setTimeout(() => executeTrailingCall(...args), mergedOptions.delay);

      // Set maxDelay timer if defined
      if (!isUndefined(mergedOptions.maxDelay)) {
        maxDelayTimer = globalThis.setTimeout(() => executeTrailingCall(...args), mergedOptions.maxDelay);
      }
    }
    
    return result;
  }

  debounceWrapper.cancel = () => {
    globalThis.clearTimeout(timer);
    globalThis.clearTimeout(maxDelayTimer);

    timer = null;
    maxDelayTimer = null;
  };

  return debounceWrapper;
}

export default withValidator(debounce, debounceValidators);
