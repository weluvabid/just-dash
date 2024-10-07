import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import every from './every';

const everySuite = suite('every function');

everySuite('should return true for empty collections', () => {
  assert.equal(every([], () => true), true);
  assert.equal(every({}, () => true), true);
});

everySuite('should return false if fn is not a function', () => {
  assert.equal(every([1, 2, 3], null), false);
  assert.equal(every({ a: 1, b: 2 }, 'notAFunction'), false);
  assert.equal(every([1, 2, 3], 123), false);
});

everySuite('should return false if collection is null or undefined', () => {
  assert.equal(every(null, () => true), false);
  assert.equal(every(undefined, () => true), false);
});

everySuite('should return true when all elements satisfy the predicate', () => {
  const resultArray = every([2, 4, 6], (value) => value % 2 === 0);
  
  assert.equal(resultArray, true);

  const resultObj = every({ a: 2, b: 4 }, (value) => value > 0);

  assert.equal(resultObj, true);

  const resultMap = every(new Map([['a', 2], ['b', 4]]), (value) => value > 0);

  assert.equal(resultMap, true);
});

everySuite('should return false when any element fails the predicate', () => {
  const resultArray = every([2, 3, 4], (value) => value % 2 === 0);
  
  assert.equal(resultArray, false);

  const resultObj = every({ a: 2, b: -4 }, (value) => value > 0);

  assert.equal(resultObj, false);

  const resultMap = every(new Map([['a', 2], ['b', -4]]), (value) => value > 0);

  assert.equal(resultMap, false);
});

// Additional edge cases
everySuite('should handle mixed types', () => {
  assert.equal(every([2, 'test', 4], (value) => typeof value === 'number'), false);
  assert.equal(every([NaN, -1, 0], (value) => value < 1), false);
});

everySuite('should work with Set collections', () => {
  const resultSet = every(new Set([2, 4, 6]), (value) => value % 2 === 0);

  assert.equal(resultSet, true);

  const resultSetFail = every(new Set([2, 3, 6]), (value) => value % 2 === 0);
 
  assert.equal(resultSetFail, false);
});

// Run the tests
everySuite.run();
