import { compare } from "./is-equal.utils";

export default function isEqual(a, b) {
  return a === b ? true : compare(new WeakSet(), a, b);
}
