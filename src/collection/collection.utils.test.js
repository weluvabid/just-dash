import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { createEmptyCollection, toArray, setValueInCollection } from './collection.utils';

const collectionUtilsSuite = suite('collectionUtils');

// Test case for `createEmptyCollection`
collectionUtilsSuite('createEmptyCollection should return correct empty collection', () => {
  assert.equal(createEmptyCollection([1, 2, 3]), []);
  assert.equal(createEmptyCollection({ a: 1 }), {});
  assert.instance(createEmptyCollection(new Map()), Map);
  assert.instance(createEmptyCollection(new Set()), Set);
  assert.is(createEmptyCollection('string'), null); // Unsupported type
});
  
// Test case for `toArray`
collectionUtilsSuite('toArray should convert input into an array of entries', () => {
  assert.equal(toArray([1, 2, 3]), [['0', 1], ['1', 2], ['2', 3]]);
  assert.equal(toArray({ a: 1, b: 2 }), [['a', 1], ['b', 2]]);
  assert.equal(toArray(new Map([['a', 1]])), [['a', 1]]);
  assert.equal(toArray(new Set([1, 2])), [['0', 1], ['1', 2]]); // Since Set turns into an array first
  assert.equal(toArray('unsupported'), []); // Unsupported type
});
  
// Test case for `setValueInCollection`
collectionUtilsSuite('setValueInCollection should correctly set values in the given collection', () => {
  const arr = [];
  const obj = {};
  const map = new Map();
  const set = new Set();
  
  setValueInCollection(arr, 0, 42);
  setValueInCollection(obj, 'key', 42);
  setValueInCollection(map, 'key', 42);
  setValueInCollection(set, null, 42);
  
  assert.equal(arr, [42]);
  assert.equal(obj, { key: 42 });
  assert.equal(map, new Map([['key', 42]]));
  assert.equal(set, new Set([42]));
});

collectionUtilsSuite.run();
