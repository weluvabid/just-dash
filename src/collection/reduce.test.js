import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import reduce from './reduce';

const reduceSuite = suite('reduce');

reduceSuite('should return null for invalid inputs', () => {
  assert.equal(reduce(null, () => {}), null);
  assert.equal(reduce(undefined, () => {}), null);
  assert.equal(reduce([], null), null);
  assert.equal(reduce({}, null), null);
});

reduceSuite('should return initialValue when the collection is empty', () => {
  assert.equal(reduce([], () => {}), null); // Default initialValue
  assert.equal(reduce({}, () => {}), null); // Default initialValue
  assert.equal(reduce([], () => {}, 'initial'), 'initial');
  assert.equal(reduce({}, () => {}, 'initial'), 'initial');
});

reduceSuite('should reduce an array of numbers correctly', () => {
  const sum = (acc, val) => acc + val;

  assert.equal(reduce([1, 2, 3], sum), 6);
  assert.equal(reduce([1, 2, 3], sum, 10), 16); // Starting from 10
});

reduceSuite('should reduce an object correctly', () => {
  const concatValues = (acc, val) => acc + val;

  assert.equal(reduce({ a: 'Hello', b: ' World' }, concatValues), 'Hello World');
  assert.equal(reduce({ a: 1, b: 2 }, (acc, val) => acc + val), 3);
});

reduceSuite('should handle cases where the initial value is undefined', () => {
  assert.equal(reduce([1, 2, 3], (acc, val) => acc + val), 6); // Initial value is the first element
  assert.equal(reduce([1, 2, 3], (acc, val) => acc + val, undefined), 6); // Same behavior
});

reduceSuite('should handle strings as objects', () => {
  assert.equal(reduce('hello', (acc, val) => acc + val), null); // Concatenation
});

reduceSuite('should return correct value for nested objects', () => {
  const flatten = (acc, val) => ({ ...acc, ...val });
  const nested = [{ a: 1 }, { b: 2 }, { c: 3 }];

  assert.equal(reduce(nested, flatten), { a: 1, b: 2, c: 3 });
});

reduceSuite('should handle complex scenarios', () => {
  const multiply = (acc, val) => acc * val;

  assert.equal(reduce([1, 2, 3, 4], multiply, 1), 24); // Starting from 1
  assert.equal(reduce([1, 2, 3, 4], multiply), 24); // Default initial value is the first element
});

reduceSuite('should return initialValue if collection is empty and initialValue is provided', () => {
  assert.equal(reduce([], (acc, val) => acc + val, 100), 100);
  assert.equal(reduce({}, (acc, val) => acc + val, 100), 100);
});

reduceSuite('should handle scenarios with mixed data types', () => {
  const mixed = [1, 'a', true, null];

  const concatMixed = (acc, val) => `${acc}${val}`;
  assert.equal(reduce(mixed, concatMixed, ''), '1atruenull'); // Concatenation
});

reduceSuite('should return correct value for boolean operations', () => {
  const allTrue = (acc, val) => acc && val;

  assert.equal(reduce([true, true, true], allTrue), true);
  assert.equal(reduce([true, false, true], allTrue), false);
});

reduceSuite('should handle symbols', () => {
  const sym1 = Symbol('sym1');
  const sym2 = Symbol('sym2');
  const concatSymbols = (acc, val) => acc + val.toString();
  
  assert.equal(reduce([sym1, sym2], concatSymbols, ''), 'Symbol(sym1)Symbol(sym2)');
});

reduceSuite.only('should handle Map collections', () => {
  const map = new Map([['a', 1], ['b', 2]]);
  const sumMap = (acc, val) => acc + val;
  
  assert.equal(reduce(map, sumMap), 3); // Summing values
});
  
reduceSuite('should handle Set collections', () => {
  const set = new Set([1, 2, 3]);
  const sumSet = (acc, val) => acc + val;
  
  assert.equal(reduce(set, sumSet), 6); // Summing values
});

reduceSuite.run();
