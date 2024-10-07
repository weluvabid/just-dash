import { isFunction } from "../common/utils";

import { toArray } from "../collection/collection.utils";   

const INITIAL_VALUE_UNDEFINED_SYM = Symbol('INITIAL_VALUE_UNDEFINED_SYM');

export default function reduce(obj, fn, initialValue = INITIAL_VALUE_UNDEFINED_SYM) {
  const isInitialValueUndefined = initialValue === INITIAL_VALUE_UNDEFINED_SYM;

  if (!obj || !isFunction(fn)) {
    return isInitialValueUndefined ? null : initialValue;
  }
 
  const entries = toArray(obj);

  if (entries.length === 0) {
    return isInitialValueUndefined ? null : initialValue;
  }

  let res = isInitialValueUndefined
    ? entries[0][1]
    : initialValue;
  let i = isInitialValueUndefined ? 1 : 0;

  for (; i < entries.length; i += 1) {
    const [key, value] = entries[i];

    res = fn(res, value, key);
  }

  return res;
}
