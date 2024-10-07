import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import filter from './filter';

// Create a test suite for the `filter` function.
const filterSuite = suite('filter');

// Test with an array input and a valid function.
filterSuite('should return a new array with values that pass the test function', () => {
  const arr = [1, 2, 3, 4];
  const result = filter(arr, (value) => value % 2 === 0); // Keep only even numbers
  
  assert.equal(result, [2, 4]);
});

// Test with an object input.
filterSuite('should return a new object with key-value pairs that pass the test function', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const result = filter(obj, (value) => value > 1); // Keep only values greater than 1
  
  assert.equal(result, { b: 2, c: 3 });
});

// Test with Map input.
filterSuite('should return a new Map with key-value pairs that pass the test function', () => {
  const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
  const result = filter(map, (value) => value > 1);
  const expected = new Map([['b', 2], ['c', 3]]);
  
  assert.equal(result, expected);
});

// Test with Set input.
filterSuite('should return a new Set with values that pass the test function', () => {
  const set = new Set([1, 2, 3, 4]);
  const result = filter(set, (value) => value % 2 === 0);
  const expected = new Set([2, 4]);
  
  assert.equal(result, expected);
});

// Test with unsupported input type.
filterSuite('should return null for unsupported input types', () => {
  const str = 'unsupported'; // Strings are not supported
  const result = filter(str, () => true);
  
  assert.is(result, null);
});

// Test with a non-function `fn` argument.
filterSuite('should return null if fn is not a function', () => {
  const obj = { a: 1, b: 2 };
  const result = filter(obj, 'not a function');
  
  assert.is(result, null);
});

// Test circular reference handling.
filterSuite('should avoid infinite loops with circular references', () => {
  const obj = { a: 1 };
  obj.self = obj; // Circular reference
  const result = filter(obj, (value) => typeof value === 'number');
  
  assert.equal(result, { a: 1 });
});

// Test with non-enumerable properties.
filterSuite('should ignore non-enumerable properties in objects', () => {
  const obj = {};
  
  Object.defineProperty(obj, 'hidden', { value: 42, enumerable: false });
  
  obj.visible = 100;
  const result = filter(obj, (value) => value > 0);
  
  assert.equal(result, { visible: 100 });
});

// Run the suite.
filterSuite.run();
