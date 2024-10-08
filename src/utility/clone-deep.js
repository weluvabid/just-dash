import { cloneDeepHelper } from "./clone-deep.utils";

export default function cloneDeep(obj) {
  return cloneDeepHelper(new WeakSet(), obj);
}
