export function isFunction(input) {
  return typeof input === 'function';
}

export function isArray(input) {
  return Array.isArray(input);
}

export function isNumber(input) {
  return typeof input === 'number';
}

export function isString(input) {
  return typeof input === 'string';
}

export function isPositiveWholeNumber(input) {
  return isNumber(input) && input >= 0 && input % 1 === 0;
}

export function isObject(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
}

export function isUndefined(input) {
  return typeof input === 'undefined';
}

export function  isBoolean(input) {
  return typeof input === 'boolean';
}

export function hasOwnProperty(obj, key) {
  return obj && Object.prototype.hasOwnProperty.call(obj, key);
}

export function isPrimitive(input) {
  return input === null || (typeof input !== 'object' && typeof input !== 'function');
}
