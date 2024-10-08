import { hasOwnProperty, isPrimitive } from '../common/utils';

import { KEY_MISSING_SYM } from './object.constants';
import { createEmptyObjectOfType } from './object.utils';

export function pickHelper(seen, obj, path) {
  if (path.length === 0 || seen.has(obj)) {
    return obj;
  }

  if (!isPrimitive(obj)) {
    seen.add(obj);
  }

  const [key, ...restKeys] = path;

  if (!hasOwnProperty(obj, key)) {
    return KEY_MISSING_SYM;
  }

  const value = pickHelper(seen, obj[key], restKeys);

  if (value === KEY_MISSING_SYM) {
    return value;
  }

  const clonedObj = createEmptyObjectOfType(obj);

  if (clonedObj !== undefined) {
    clonedObj[key] = value;

    return clonedObj;
  }

  return obj;
}
