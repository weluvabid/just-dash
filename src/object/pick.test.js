/* eslint-disable no-sparse-arrays */

import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import pick from './pick';

const pickSuite = suite('pick');

pickSuite('should return the original object if no keys are provided', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const result = pick(obj, []);
  
  assert.equal(result, {});
});

pickSuite('should return null or undefined if the original object is null or undefined', () => {
  const result = pick(null, []);
  
  assert.equal(result, null);

  const result2 = pick(undefined, []);
  
  assert.equal(result2, undefined);
});

pickSuite('should return an empty object if none of the provided keys exist', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const result = pick(obj, ['d', 'e', 'f']);
  
  assert.equal(result, {});
});

pickSuite('should return an object with only the specified keys', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const result = pick(obj, ['a', 'c']);
  
  assert.equal(result, { a: 1, c: 3 });
});

pickSuite('should handle nested objects and pick specified keys', () => {
  const obj = { a: 1, b: { c: 2, d: 3 }, e: 4 };
  const result = pick(obj, ['a', 'b.c', 'e']);
  
  assert.equal(result, { a: 1, b: { c: 2 }, e: 4 });
});

pickSuite('should handle nested arrays and pick specified indices', () => {
  const obj = { a: 1, b: [2, 3, 4], c: 5 };
  const result = pick(obj, ['a', 'b.1', 'c']);
  
  assert.equal(result, { a: 1, b: [, 3], c: 5 });
});

pickSuite('should handle nested objects with arrays and pick specified keys and indices', () => {
  const obj = { a: 1, b: { c: [2, 3, 4], d: 5 }, e: 6 };
  const result = pick(obj, ['a', 'b.c.1', 'e']);
  
  assert.equal(result, { a: 1, b: { c: [, 3] }, e: 6 });
});

pickSuite('should return an empty object when provided with an empty array of keys', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const result = pick(obj, []);
  
  assert.equal(result, {});
});

pickSuite('should handle symbols as keys and pick them correctly', () => {
  const sym = Symbol('sym');
  const obj = { a: 1, [sym]: 2, b: 3 };
  const result = pick(obj, ['a', sym]);
  
  assert.equal(result, { a: 1, [sym]: 2 });
});

pickSuite('should handle multiple levels of nested objects with missing keys', () => {
  const obj = { a: 1, b: { c: 2, d: { e: 3 } }, f: 4 };
  const result = pick(obj, ['b.d.f']);
  
  assert.equal(result, {});
});

pickSuite.run();
