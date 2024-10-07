import { isFunction } from "../common/utils";

import { toArray } from "../collection/collection.utils";

export default function some(obj, fn) {
  if (!obj || !isFunction(fn)) {
    return false;
  }

  for (const [key, value] of toArray(obj)) {
    if (fn(value, key)) {
      return true;
    }
  }

  return false;
}
