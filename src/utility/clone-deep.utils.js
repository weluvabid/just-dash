import { isArray, isObject, isPrimitive } from '../common/utils';
import withValidator from "../common/with-validator";
import reduce from '../collection/reduce';

import { cloneDeepHelperValidators } from "./clone-deep.constants";

function $cloneDeepHelper(seen, obj) {
  if (isPrimitive(obj) || seen.has(obj)) {
    return obj;
  }
  
  seen.add(obj);
  
  if (isArray(obj)) {
    return reduce(obj, (clonedArr, value, key) => {
      clonedArr[key] = $cloneDeepHelper(seen, value);
  
      return clonedArr;
    }, Array(obj.length));
  }
    
  if (isObject(obj)) {
    return reduce(obj, (clonedObj, value, key) => {
      clonedObj[key] = $cloneDeepHelper(seen, value);
  
      return clonedObj;
    }, {});
  }  
  
  if (obj instanceof Map) {
    return reduce(obj, (clonedMap, value, key) => {
      clonedMap.set(key, $cloneDeepHelper(seen, value));
  
      return clonedMap;
    }, new Map());
  }
  
  if (obj instanceof Set) {
    return new Set([...$cloneDeepHelper(seen, [...obj])]);
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  return null;
}
  
export const cloneDeepHelper = withValidator($cloneDeepHelper, cloneDeepHelperValidators);
