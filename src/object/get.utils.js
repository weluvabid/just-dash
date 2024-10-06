import { hasOwnProperty } from "../common/utils";

export function getHelper(obj, path, defaultValue = undefined) {
  if (path.length === 0 ){
    return obj;
  }

  const [key, ...restKeys] = path;

  return hasOwnProperty(obj, key) ? getHelper(obj[key], restKeys, defaultValue) : defaultValue;
}
