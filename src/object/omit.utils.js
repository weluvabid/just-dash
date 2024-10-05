import { isObject, isArray, hasOwnProperty } from '../common/utils';

function createOmittableObject(input) {
  if (isObject(input)) {
    return {};
  }
  
  if (isArray(input)) {
    return [];
  }
  
  return undefined;
}

export function omitHelper(seen, obj, paths, level = 0) {
  if (paths.length === 0 || seen.has(obj) || (!isObject(obj) && !isArray(obj))) {
    return obj;
  }

  if (isObject(obj) && !isArray(obj)) {
    seen.add(obj);
  }

  const keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
  const ignoredKeys = new Set(paths
    .filter(path => path.isValid).map((path) => ({ ...path, isValid: hasOwnProperty(obj, path.value[level]) }))
    .filter(path => path.isValid && level === path.value.length - 1)
    .map(path => path.value[level]));

  return keys.reduce((newObj, key) => {
    const value = obj[key];

    if (!ignoredKeys.has(key)) {
      newObj[key] = omitHelper(seen, value, paths, level + 1);
    }

    return newObj;
  }, createOmittableObject(obj));
}
