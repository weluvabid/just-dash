import { isArray } from '../common/utils';

import { extractKeys } from './object.utils';
import { omitHelper } from './omit.utils';

export default function omit(obj, keys) {
  if (!isArray(keys) || keys.length === 0) {
    return obj;
  }

  const paths = keys.map((key) => ({ isValid: true, value: extractKeys(key) }));

  return omitHelper(new WeakSet(), obj, paths);
}
