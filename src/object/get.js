import { extractKeys } from "./object.utils";
import { getHelper } from "./get.utils";

export default function get(obj, key, defaultValue = undefined) {
  const extractedKeys = extractKeys(key);
  
  return extractedKeys.length === 0
    ? defaultValue
    : getHelper(obj, extractedKeys, defaultValue);
}
