import { mergeHelper } from "./merge.utils";

export default function merge(target, ...srcs) {
  return mergeHelper(new WeakSet(), target, ...srcs);
}
