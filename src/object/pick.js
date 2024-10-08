import { isArray, isUndefined } from '../common/utils';

import { KEY_MISSING_SYM } from './object.constants';
import { extractKeys, createEmptyObjectOfType } from './object.utils';
import { pickHelper } from './pick.utils';
import merge from './merge';

export default function pick(obj, keys) {
  if (!isArray(keys)) {
    return obj;
  }

  if (keys.length === 0) {
    const emptyPickableObject = createEmptyObjectOfType(obj);

    return isUndefined(emptyPickableObject)
      ? obj
      : emptyPickableObject;
  }

  return keys.reduce(
    (pickedObj, key) => {
      const extractedKeys = extractKeys(key);

      if (extractedKeys.length === 0) {
        return pickedObj;
      }

      const newPickedObj = pickHelper(new WeakSet(), obj, extractedKeys);

      return newPickedObj !== KEY_MISSING_SYM
        ? merge(pickedObj, newPickedObj) 
        : pickedObj
    },
    createEmptyObjectOfType(obj)
  );
}
