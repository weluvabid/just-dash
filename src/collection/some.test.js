import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import some from './some';

const someSuite = suite('some function');

someSuite('should return false for empty collections', () => {
  assert.equal(some([], (value) => value > 0), false);
  assert.equal(some({}, (value) => value > 0), false);
});

someSuite('should return false if fn is not a function', () => {
  assert.equal(some([1, 2, 3], null), false);
  assert.equal(some({ a: 1, b: 2 }, 'notAFunction'), false);
  assert.equal(some([1, 2, 3], 123), false);
});

someSuite('should return false if collection is null or undefined', () => {
  assert.equal(some(null, () => true), false);
  assert.equal(some(undefined, () => true), false);
});

someSuite('should return true when at least one element satisfies the predicate', () => {
  const resultArray = some([1, 2, 3], (value) => value > 2);
  
  assert.equal(resultArray, true);

  const resultObj = some({ a: 1, b: 2 }, (value) => value === 2);
  
  assert.equal(resultObj, true);

  const resultMap = some(new Map([['a', 1], ['b', 3]]), (value) => value === 3);
  
  assert.equal(resultMap, true);
});

someSuite('should return false when no elements satisfy the predicate', () => {
  const resultArray = some([1, 2, 3], (value) => value > 3);
  
  assert.equal(resultArray, false);

  const resultObj = some({ a: 1, b: 2 }, (value) => value > 2);
  
  assert.equal(resultObj, false);

  const resultMap = some(new Map([['a', 1], ['b', 2]]), (value) => value > 2);
  
  assert.equal(resultMap, false);
});

// Additional edge cases
someSuite('should handle mixed types', () => {
  assert.equal(some([2, 'test', 4], (value) => typeof value === 'number'), true);
  assert.equal(some([NaN, -1, 0], (value) => value < 0), true); // This should return true
});

someSuite('should work with Set collections', () => {
  const resultSet = some(new Set([2, 3, 4]), (value) => value % 2 === 0);
  
  assert.equal(resultSet, true);

  const resultSetFail = some(new Set([1, 3, 5]), (value) => value % 2 === 0);
  
  assert.equal(resultSetFail, false);
});

// Run the tests
someSuite.run();
