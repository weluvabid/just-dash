import { extractKeys } from "./object.utils";
import { setHelper } from "./set.utils";

export default function set(obj, key, value) {
  if (key === '') {
    obj[key] = value;

    return obj;
  }

  const extractedKeys = extractKeys(key);

  if (extractedKeys.length === 0) {
    return obj;
  }

  return setHelper(obj, extractedKeys, value);
}

