import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import merge from './merge';

const mergeSuite = suite('merge');

mergeSuite('should merge simple objects', () => {
  const target = { a: 1, b: 2 };
  const source = { b: 3, c: 4 };
  const expected = { a: 1, b: 3, c: 4 };
  
  assert.equal(merge(target, source), expected);
});

mergeSuite('should merge nested objects', () => {
  const target = { user: { name: 'Alice', age: 25 } };
  const source = { user: { age: 30, city: 'Wonderland' } };
  const expected = { user: { name: 'Alice', age: 30, city: 'Wonderland' } };
  
  assert.equal(merge(target, source), expected);
});

mergeSuite('should handle arrays', () => {
  const target = { items: [1, 2, 3] };
  const source = { items: [4, 5] };
  const expected = { items: [4, 5, 3] };
  
  assert.equal(merge(target, source), expected);
});

mergeSuite('should merge Sets', () => {
  const target = { set: new Set([1, 2, 3]) };
  const source = { set: new Set([3, 4, 5]) };
  const expected = { set: new Set([1, 2, 3, 4, 5]) };
  
  assert.equal(merge(target, source), expected);
});

mergeSuite('should merge Maps', () => {
  const target = { map: new Map([[1, 'a'], [2, 'b']]) };
  const source = { map: new Map([[2, 'c'], [3, 'd']]) };
  const expected = { map: new Map([[1, 'a'], [2, 'c'], [3, 'd']]) };
  
  assert.equal(merge(target, source), expected);
});

mergeSuite('should handle Dates', () => {
  const target = { date: new Date('2023-01-01') };
  const source = { date: new Date('2023-01-02') };
  const expected = { date: new Date('2023-01-02') };
  
  assert.equal(merge(target, source), expected);
});

mergeSuite('should handle circular references', () => {
  const circularA = {};
  circularA.self = circularA;

  const circularB = {};
  circularB.self = circularB;

  const merged = merge(circularA, circularB);
  
  assert.equal(merged.self, merged); // Test if the circular reference is maintained
});

mergeSuite('should ignore non-mergeable types', () => {
  const target = { a: 1 };
  const source = { a: undefined, b: null, c: 'string' };
  const expected = { a: undefined, b: null, c: 'string' };
  
  assert.equal(merge(target, source), expected);
});

mergeSuite('should overwrite primitive values', () => {
  const target = { a: 1, b: 2 };
  const source = { a: 3 };
  const expected = { a: 3, b: 2 };
  
  assert.equal(merge(target, source), expected);
});

mergeSuite.run();
