import { isFunction } from "../common/utils";

import { createEmptyCollection, toArray, setValueInCollection } from "../collection/collection.utils";

export default function filter(obj, fn) {
  const newCollection = createEmptyCollection(obj);

  if (newCollection === null || !isFunction(fn)) {
    return null;
  }

  for (const [key, value] of toArray(obj)) {
    if (fn(value, key)) {
      setValueInCollection(newCollection, key, value, true);
    }
  }

  return newCollection;
}
