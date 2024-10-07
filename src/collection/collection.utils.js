import { isArray, isObject } from "../common/utils";

export function createEmptyCollection(input) {
  if (isArray(input)) {
    return [];
  }
  
  if (isObject(input)) {
    return {};
  }
  
  if (input instanceof Map) {
    return new Map();
  }
  
  if (input instanceof Set) {
    return new Set();
  }
  
  return null; // Return null if the input type is unsupported
}
  
export function toArray(input) {
  if (isArray(input) || isObject(input)) {
    return Object.entries(input);
  }
  
  if (input instanceof Map) {
    return [...input];
  }
  
  if (input instanceof Set) {
    return toArray([...input]);
  }
  
  return [];
}
  
export function setValueInCollection(collection, key, value) {
  if (isArray(collection) || isObject(collection)) {
    collection[key] = value;
  } else if (collection instanceof Map) {
    collection.set(key, value);
  } else if (collection instanceof Set) {
    collection.add(value);
  }
  
  return collection;
}
  