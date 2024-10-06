import { isArray, isObject, isString } from "../common/utils";

import { KEY_REGEX } from "./object.constants";

export function extractKeys(input) {
  if (typeof input === 'symbol') {
    return [input];
  }
    
  if (arguments.length === 0 || !isString(input)) {
    return [];
  }

  KEY_REGEX.lastIndex = 0; // Ensure regex state is reset

  const keys = [];
  let key;
    
  while ((key = KEY_REGEX.exec(input)) !== null) {
    const [, matchedKey] = key;

    keys.push(matchedKey);
  }

  return keys;
}

export function createEmptyObjectOfType(input) {
  if (isObject(input)) {
    return {};
  }
  
  if (isArray(input)) {
    return [];
  }
  
  return undefined;
}

export function getOrCreateObjectOfType(target, src) {
  if (isObject(src)) {
    return isObject(target) ? target : {};
  }

  if (isArray(src)) {
    return isArray(target) ? target : [];
  }
      
  return undefined;
}
