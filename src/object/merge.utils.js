import { hasOwnProperty, isPrimitive, isUndefined } from "../common/utils";
import withValidator from "../common/with-validator";

import { mergeValidators } from "./merge.constants";
import { getOrCreateObjectOfType } from "./object.utils";
 
function cloneValue(newValue, oldValue) {
  if (newValue instanceof Set) {
    const value = oldValue instanceof Set ? [...oldValue, ...newValue] : newValue;
      
    return new Set(value)
  }
    
  if (newValue instanceof Map) {
    const value = oldValue instanceof Map ? [...oldValue, ...newValue] : newValue;
      
    return new Map(value);
  }
    
  if (newValue instanceof Date) {
    return new Date(newValue.getTime());
  }
    
  return newValue;
}

function $mergeHelper(seen, target, ...srcs) {
  if (isPrimitive(target) || seen.has(target)) {
    return target;
  }
  
  seen.add(target);
  
  srcs.forEach((src) => {
    const keys = [...Object.keys(src), ...Object.getOwnPropertySymbols(src)];

    keys.forEach((key) => {
      const value = src[key];

      if ((!hasOwnProperty(target, key) ||  target[key] !== value)) {
        const maybeObj = getOrCreateObjectOfType(target[key], value);
        target[key] = isUndefined(maybeObj)
          ? cloneValue(value, target[key])
          : $mergeHelper(seen, maybeObj, value);
      }
    });
  });
  
  return target;
}

export const mergeHelper = withValidator($mergeHelper, mergeValidators);
