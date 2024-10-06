import { hasOwnProperty, isArray, isObject } from "../common/utils";

import { getOrCreateObjectOfType } from "./object.utils";

export function setHelper(obj, path, value) {
  if (path.length === 0) {
    return value;
  }
  
  const [key, ...restKeys] = path;
    
  if (!hasOwnProperty(obj, key) || !isSettable(obj)) {
    obj = getOrCreateObjectOfType(obj, Number.isInteger(+key) ? [] : {}); 
  }
    
  obj[key] = setHelper(obj[key], restKeys, value);
  
  return obj;
}
  
function isSettable(input) {
  return isArray(input) || isObject(input);
}
