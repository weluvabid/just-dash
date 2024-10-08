/* eslint-disable no-sparse-arrays */

import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import isEqual from './is-equal';

const isEqualSuite = suite('isEqual');
const funcRef = testFunc1;

function testFunc1() { return 1; }
function testFunc2() { return 1; }

// Primitive types
isEqualSuite('should return true for equal primitive values', () => {
  assert.equal(isEqual(1, 1), true);
  assert.equal(isEqual('abc', 'abc'), true);
  assert.equal(isEqual(true, true), true);
  assert.equal(isEqual(null, null), true);
  assert.equal(isEqual(undefined, undefined), true);
});

isEqualSuite('should return false for non-equal primitive values', () => {
  assert.equal(isEqual(1, 2), false);
  assert.equal(isEqual('abc', 'def'), false);
  assert.equal(isEqual(true, false), false);
  assert.equal(isEqual(null, undefined), false);
});

// Arrays
isEqualSuite('should return true for equal arrays', () => {
  assert.equal(isEqual([1, 2, 3], [1, 2, 3]), true);
  assert.equal(isEqual([], []), true);
});

isEqualSuite('should return false for non-equal arrays', () => {
  assert.equal(isEqual([1, 2, 3], [1, 2]), false);
  assert.equal(isEqual([1, 2, 3], [1, 2, 4]), false);
});

// Objects
isEqualSuite('should return true for equal objects', () => {
  assert.equal(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }), true);
  assert.equal(isEqual({}, {}), true);
});

isEqualSuite('should return false for non-equal objects', () => {
  assert.equal(isEqual({ a: 1, b: 2 }, { a: 1 }), false);
  assert.equal(isEqual({ a: 1, b: 2 }, { a: 2, b: 1 }), false);
});

// Arrays and objects combined
isEqualSuite('should return true for nested arrays and objects', () => {
  assert.equal(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }]), true);
});

isEqualSuite('should return false for non-equal nested arrays and objects', () => {
  assert.equal(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 3 }]), false);
});

// Maps
isEqualSuite('should return true for equal Maps', () => {
  const map1 = new Map([['a', 1], ['b', 2]]);
  const map2 = new Map([['a', 1], ['b', 2]]);

  assert.equal(isEqual(map1, map2), true);
});

isEqualSuite('should return false for non-equal Maps', () => {
  const map1 = new Map([['a', 1], ['b', 2]]);
  const map2 = new Map([['a', 2], ['b', 2]]);

  assert.equal(isEqual(map1, map2), false);
});

// Sets
isEqualSuite('should return true for equal Sets', () => {
  const set1 = new Set([1, 2, 3]);
  const set2 = new Set([1, 2, 3]);

  assert.equal(isEqual(set1, set2), true);
});

isEqualSuite('should return false for non-equal Sets', () => {
  const set1 = new Set([1, 2, 3]);
  const set2 = new Set([1, 2]);
  assert.equal(isEqual(set1, set2), false);
});

// Circular references
isEqualSuite('should handle circular references', () => {
  // Circular references - Expected true
  const obj1 = { a: 1 };
  const obj2 = { a: 1 };
  obj1.self = obj1;
  obj2.self = obj2;

  assert.equal(isEqual(obj1, obj2), true, "Case 1: Same structure and circular reference");

  const obj3 = { a: 1 };
  obj3.self = obj1; // Points to obj1, which is structurally the same

  assert.equal(isEqual(obj1, obj3), true, "Case 2: Circular reference in obj3.self points to obj1");

  // Different structures - Expected false
  const obj4 = { a: 1, b: 2 };
  obj4.self = obj4;

  const obj5 = { a: 1 };
  obj5.self = obj5;

  assert.equal(isEqual(obj4, obj5), false, "Case 3: Different structure (obj4 has extra `b` key)");

  // Different circular references - Expected false
  const obj6 = { a: 1 };
  const obj7 = { a: 1 };
  obj6.self = obj6; // obj6 points to itself
  obj7.self = obj7;
  obj7.other = obj6; // obj7 has a reference to obj6

  assert.equal(isEqual(obj6, obj7), false, "Case 4: obj7 has an extra reference 'other'");

  // Different circular references - Expected false
  const obj8 = { a: 1 };
  const obj9 = { a: 1 };
  obj8.self = obj8;
  obj9.self = obj8; // obj9 points to obj8 instead of itself

  assert.equal(isEqual(obj8, obj9), true, "Case 5: obj9 has the same self-reference pointing to obj8");
});

// Dates
isEqualSuite('should return true for equal Date objects', () => {
  const date1 = new Date('2023-01-01');
  const date2 = new Date('2023-01-01');

  assert.equal(isEqual(date1, date2), true);
});

isEqualSuite('should return false for non-equal Date objects', () => {
  const date1 = new Date('2023-01-01');
  const date2 = new Date('2024-01-01');

  assert.equal(isEqual(date1, date2), false);
});

// RegExp
isEqualSuite('should return true for equal RegExp', () => {
  const reg1 = /abc/;
  const reg2 = /abc/;

  assert.equal(isEqual(reg1, reg2), true);
});

isEqualSuite('should return false for non-equal RegExp', () => {
  const reg1 = /abc/;
  const reg2 = /def/;

  assert.equal(isEqual(reg1, reg2), false);
});

// Symbols
isEqualSuite('should return true for equal Symbols', () => {
  const sym1 = Symbol('sym');
  const sym2 = Symbol.for('sym');

  assert.equal(isEqual(sym1, sym1), true); // Same symbol
  assert.equal(isEqual(sym2, sym2), true); // Same symbol
});

isEqualSuite('should return false for non-equal Symbols', () => {
  const sym1 = Symbol('sym');
  const sym2 = Symbol('sym');

  assert.equal(isEqual(sym1, sym2), false); // Different symbols
});

// NaN
isEqualSuite('should return true for NaN comparison', () => {
  assert.equal(isEqual(NaN, NaN), true);
});

// Edge cases
isEqualSuite('should handle edge cases', () => {
  assert.equal(isEqual([], {}), false); // Different types
  assert.equal(isEqual(null, {}), false); // null vs object
  assert.equal(isEqual(undefined, []), false); // undefined vs array
  assert.equal(isEqual(null, undefined), false); // null vs undefined
});

isEqualSuite('should return true for sparse arrays with same gaps', () => {
  const sparseArr1 = [1, , 3]; // sparse array with a gap at index 1
  const sparseArr2 = [1, , 3]; // sparse array with a gap at index 1

  assert.equal(isEqual(sparseArr1, sparseArr2), true, "Sparse arrays with same gaps should be equal");
});

isEqualSuite('should return false for sparse and non-sparse arrays with undefined', () => {
  const sparseArr1 = [1, , 3]; // sparse array with a gap at index 1
  const nonSparseArr = [1, undefined, 3]; // not sparse, contains 'undefined'

  assert.equal(isEqual(sparseArr1, nonSparseArr), false, "Sparse array and non-sparse array with undefined should not be equal");
});

isEqualSuite('should return false for sparse arrays with different gaps', () => {
  const sparseArr1 = [1, , 3]; // sparse array with a gap at index 1
  const sparseArr3 = [1, , , 3]; // sparse array with two gaps

  assert.equal(isEqual(sparseArr1, sparseArr3), false, "Sparse arrays with different gaps should not be equal");
});

isEqualSuite('should return true for empty sparse arrays with the same number of slots', () => {
  const emptySparseArr1 = new Array(5); // sparse array with 5 empty slots
  const emptySparseArr2 = new Array(5); // another sparse array with 5 empty slots

  assert.equal(isEqual(emptySparseArr1, emptySparseArr2), true, "Sparse arrays with only empty slots should be equal");
});

isEqualSuite('should return false for sparse arrays with different lengths', () => {
  const emptySparseArr1 = new Array(5); // sparse array with 5 empty slots
  const emptySparseArr3 = new Array(6); // sparse array with 6 empty slots

  assert.equal(isEqual(emptySparseArr1, emptySparseArr3), false, "Sparse arrays with different lengths should not be equal");
});

isEqualSuite('functions with different references are not equal', () => {
  assert.is(isEqual(testFunc1, testFunc2), false, 'Different function references should return false');
});

isEqualSuite('functions with the same reference are equal', () => {
  assert.is(isEqual(testFunc1, funcRef), true, 'Same function reference should return true');
});

isEqualSuite('anonymous functions are not equal to named functions', () => {
  assert.is(isEqual(testFunc1, () => 1), false, 'Anonymous function and named function should return false');
});

isEqualSuite.run();
