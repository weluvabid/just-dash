import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { extractKeys } from './object.utils';

const objectUtilsSuite = suite('object.utils');

objectUtilsSuite('should return an empty array when no input is provided', () => {
  assert.equal(extractKeys(), []);
});

objectUtilsSuite('should return an empty array when an empty string is provided', () => {
  assert.equal(extractKeys(''), []);
});

objectUtilsSuite('should return an array with a single key when a string with a single key is provided', () => {
  assert.equal(extractKeys('key'), ['key']);
});

objectUtilsSuite('should return an array with multiple keys when a string with multiple keys is provided', () => {
  assert.equal(extractKeys('key1.key2.key3'), ['key1', 'key2', 'key3']);
});

objectUtilsSuite('should return an array with multiple keys when a string with nested keys is provided', () => {
  assert.equal(extractKeys('key1[key2].key3'), ['key1', 'key2', 'key3']);
});

objectUtilsSuite('should return an array with multiple keys when a string with quoted keys is provided', () => {
  assert.equal(extractKeys('"key1".key2'), ['key1', 'key2']);
});

objectUtilsSuite('should return an array with multiple keys from a malformed string', () => {
  assert.equal(extractKeys('key1[[[[[[[[[[0]'), ['key1', '0']);
  assert.equal(extractKeys('key1[0]'), ['key1', '0']);
  assert.equal(extractKeys('key1[0]]]key2'), ['key1', '0', 'key2']);
  assert.equal(extractKeys('key1[0]]]key2.key3'), ['key1', '0', 'key2', 'key3']);
});

objectUtilsSuite('should return an empty array when a non-string input is provided', () => {
  assert.equal(extractKeys(123), []);
  assert.equal(extractKeys(null), []);
  assert.equal(extractKeys(undefined), []);
  assert.equal(extractKeys({}), []);
});

objectUtilsSuite.run();
