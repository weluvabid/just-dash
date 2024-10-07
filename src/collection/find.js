import { isFunction } from "../common/utils";

import { toArray } from "../collection/collection.utils";

export default function find(obj, maybeFn) {
  const isPredicateFn = isFunction(maybeFn);

  for (const [, value] of toArray(obj)) {
    if ((isPredicateFn && maybeFn(value)) || maybeFn === value) {
      return value;
    }
  }

  return null;
}
