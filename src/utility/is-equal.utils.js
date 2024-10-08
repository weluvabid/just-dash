import { hasOwnProperty, isArray, isObject, isPrimitive } from "../common/utils";
import withValidator from "../common/with-validator";
import every from "../collection/every";

import { compareValidators } from "./is-equal.constants";

function $compare(seen, src, target) {
  if (isPrimitive(src) || isPrimitive(target)) {
    return Number.isNaN(src) && Number.isNaN(target) ? true : src === target;
  }
  
  if (seen.has(src) && seen.has(target)) {
    return true;
  }
  
  if (seen.has(src) || seen.has(target)) {
    return false;
  }
  
  seen.add(src);
  seen.add(target);
  
  if (isArray(src) && isArray(target)) {
    if (src.length !== target.length) {
      return false;
    }
  
    for (let i = 0; i < src.length; i += 1) {
      const hasSrcElement = hasOwnProperty(src, i);
      const hasTargetElement = hasOwnProperty(target, i);
  
      if (hasSrcElement !== hasTargetElement || (hasSrcElement && !compare(seen, src[i], target[i]))) {
        return false;
      }
    }
  
    return true;
  }
  
  if (isObject(src) && isObject(target)) {
    const srcKeys = Object.getOwnPropertyNames(src);
    const targetKeys = Object.getOwnPropertyNames(target);
  
    if (srcKeys.length !== targetKeys.length) {
      return false;
    }
  
    return every(srcKeys, (key) => compare(seen, src[key], target[key]));
  }
  
  if (src instanceof Map && target instanceof Map) {
    if (src.size !== target.size) {
      return false;
    }
  
    return every(src, (value, key) => compare(seen, value, target.get(key)));
  }
  
  if (src instanceof Set && target instanceof Set) {
    if (src.size !== target.size) {
      return false;
    }
        
    return compare(seen, [...src], [...target]);
  }
  
  if (src instanceof RegExp && target instanceof RegExp) {
    return src.toString() === target.toString();
  }
  
  if (src instanceof Date && target instanceof Date) {
    return src.getTime() === target.getTime();
  } 
  
  return false;
}

export const compare = withValidator($compare, compareValidators);
