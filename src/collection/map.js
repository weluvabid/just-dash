import { isFunction } from "../common/utils";

import { createEmptyCollection, toArray, setValueInCollection } from "../collection/collection.utils";

export default function map(obj, fn) {
  const newCollection = createEmptyCollection(obj);

  if (newCollection === null || !isFunction(fn)) {
    return null;
  }

  for (const [key, value] of toArray(obj)) {
    setValueInCollection(newCollection, key, fn(value, key));
  }

  return newCollection;
}
