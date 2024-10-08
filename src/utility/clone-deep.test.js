/* eslint-disable no-sparse-arrays */

import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import cloneDeep from './clone-deep';
import { hasOwnProperty } from '../common/utils';

const cloneDeepSuite = suite('cloneDeep');

cloneDeepSuite('should clone arrays', () => {
  const arr = [1, 2, 3];
  const clonedArr = cloneDeep(arr);
  
  assert.equal(clonedArr, arr); // Ensure values are equal
  assert.is.not(clonedArr, arr); // Ensure deep copy (different instance)
});
  
cloneDeepSuite('should clone objects', () => {
  const obj = { a: 1, b: { c: 2 } };
  const clonedObj = cloneDeep(obj);
  
  assert.equal(clonedObj, obj); // Ensure values are equal
  assert.is.not(clonedObj, obj); // Ensure deep copy (different instance)
  assert.is.not(clonedObj.b, obj.b); // Ensure nested objects are deeply cloned
});

cloneDeepSuite('should clone Maps', () => {
  const map = new Map([['a', 1], ['b', { c: 2 }]]);
  const clonedMap = cloneDeep(map);
  
  assert.equal(clonedMap.get('a'), map.get('a')); // Ensure values are equal
  assert.is.not(clonedMap, map); // Ensure deep copy (different instance)
  assert.is.not(clonedMap.get('b'), map.get('b')); // Ensure nested objects are deeply cloned
});
  
cloneDeepSuite('should clone Sets', () => {
  const set = new Set([1, 2, { a: 3 }]);
  const clonedSet = cloneDeep(set);
  
  assert.equal([...clonedSet][0], [...set][0]); // Ensure values are equal
  assert.is.not(clonedSet, set); // Ensure deep copy (different instance)
  assert.is.not([...clonedSet][2], [...set][2]); // Ensure nested objects are deeply cloned
});
  
cloneDeepSuite('should clone Dates', () => {
  const date = new Date();
  const clonedDate = cloneDeep(date);
  
  assert.equal(clonedDate.getTime(), date.getTime()); // Ensure value (time) is equal
  assert.is.not(clonedDate, date); // Ensure deep copy (different instance)
});
  
cloneDeepSuite('should clone RegExp', () => {
  const regex = /abc/g;
  const clonedRegex = cloneDeep(regex);
  
  assert.equal(clonedRegex.toString(), regex.toString()); // Ensure pattern is equal
  assert.is.not(clonedRegex, regex); // Ensure deep copy (different instance)
});
  
cloneDeepSuite('should handle circular references', () => {
  const obj = { a: 1 };
  obj.self = obj;
  const clonedObj = cloneDeep(obj);
  
  assert.equal(clonedObj.a, obj.a); // Ensure values are equal
  assert.is.not(clonedObj, obj); // Ensure deep copy (different instance)
  assert.equal(clonedObj.self, clonedObj); // Ensure circular reference points to itself
});
  
cloneDeepSuite('should handle sparse arrays', () => {
  const arr = [1, , 3]; // Sparse array
  const clonedArr = cloneDeep(arr);
  
  assert.equal(clonedArr.length, arr.length); // Ensure length is equal
  assert.is.not(clonedArr, arr); // Ensure deep copy (different instance)
  assert.equal(clonedArr[0], arr[0]); // Ensure first element is equal
  assert.equal(clonedArr[2], arr[2]); // Ensure third element is equal
  assert.is(hasOwnProperty(clonedArr, 1), false); // Ensure sparse index remains sparse
});


// Run the suite
cloneDeepSuite.run();
