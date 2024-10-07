import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import find from './find';

const findSuite = suite('find function');

findSuite('should return null for null or undefined collections', () => {
  assert.equal(find(null, () => true), null);
  assert.equal(find(undefined, () => true), null);
});

findSuite('should return the first matching value based on predicate function', () => {
  assert.equal(find([1, 2, 3], (value) => value > 1), 2);
  assert.equal(find({ a: 1, b: 2, c: 3 }, (value) => value === 3), 3);
});

findSuite('should return the first matching value when using a direct value', () => {
  assert.equal(find([1, 2, 3], 2), 2);
  assert.equal(find({ a: 1, b: 2, c: 3 }, 1), 1);
});

findSuite('should return null when no matches are found', () => {
  assert.equal(find([1, 2, 3], (value) => value > 3), null);
  assert.equal(find({ a: 1, b: 2 }, 3), null);
});

// Additional edge cases
findSuite('should handle mixed types', () => {
  assert.equal(find([2, 'test', 4], 'test'), 'test');
  assert.equal(find([NaN, -1, 0], (value) => value < 0), -1);
});

// Run the tests
findSuite.run();
