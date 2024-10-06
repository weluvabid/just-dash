/* eslint-disable no-sparse-arrays */

import { test } from 'uvu';
import * as assert from 'uvu/assert';
import set from './set'; // Assuming set is your function from the latest implementation

// General Test Cases

// Test: Setting a value in a nested object
test('Set value in nested object', () => {
  const obj = { a: { b: { c: 2 } } };
  const result = set(obj, 'a.b.c', 5);
  
  assert.equal(result, { a: { b: { c: 5 } } });
});

// Test: Setting a value in an array with numeric keys
test('Set value in an array with numeric keys', () => {
  const obj = { arr: [1, 2] };
  const result = set(obj, 'arr.0', 10);
  
  assert.equal(result, { arr: [10, 2] });
});

// Test: Setting a value in a new object
test('Set value in new object', () => {
  const obj = {};
  const result = set(obj, 'a.b', 5);
  
  assert.equal(result, { a: { b: 5 } });
});

// Test: Setting a value on a non-existent path
test('Set value on non-existent path', () => {
  const obj = { a: 1 };
  const result = set(obj, 'a.b.c', 3);
  
  assert.equal(result, { a: { b: { c: 3 } } });
});

// Edge Case Test Cases

// Test: Setting a deeply nested value in an empty object
test('Set deep nested value in an empty object', () => {
  const obj = {};
  const result = set(obj, 'a.b.c.d', 5);
  
  assert.equal(result, { a: { b: { c: { d: 5 } } } });
});

// Test: Setting a value in an array with a numeric key larger than its length
test('Set array index larger than current length', () => {
  const obj = { arr: [1, 2] };
  const result = set(obj, 'arr.5.value', 3);
  
  assert.equal(result, { arr: [1, 2, undefined, undefined, undefined, { value: 3 }] });
});

// Test: Overwriting an existing primitive with an object
test('Overwrite primitive with an object', () => {
  const obj = { a: 1 };
  const result = set(obj, 'a.b', 2);
  
  assert.equal(result, { a: { b: 2 } });
});

// Test: Overwriting an existing object with a primitive
test('Overwrite object with a primitive', () => {
  const obj = { a: { b: 2 } };
  const result = set(obj, 'a', 3);
  
  assert.equal(result, { a: 3 });
});

// Test: Handling an empty key as valid key
test('Handle empty key as valid key', () => {
  const obj = { a: { b: 2 } };
  const result = set(obj, '', 3); // Should set the value for the empty string key
    
  assert.equal(result, { a: { b: 2 }, '': 3 });
});

// Test: Setting a value to an empty string key
test('Set value to empty string key', () => {
  const obj = {};
  const result = set(obj, '', 1);
  
  assert.equal(result, { '': 1 });
});

// Test: Setting a value on a non-object/non-array primitive
test('Set value on a non-object primitive', () => {
  const obj = 5;
  const result = set(obj, 'a.b', 3); // Should not modify since obj isn't an object
  
  assert.equal(result, { a: { b: 3 } });
});

// Test: Handle sparse arrays
test('Handle sparse arrays', () => {
  const obj = { arr: [1, , 3] }; // sparse array with a hole
  const result = set(obj, 'arr.1.b', 4);
  
  assert.equal(result, { arr: [1, { b: 4 }, 3] });
});

// Test: Handle circular references
test('Handle circular references safely', () => {
  const obj = { a: {} };
  obj.a.self = obj.a; // Create a circular reference

  // Attempt to set a value inside the circular reference
  const result = set(obj, 'a.b', 5);
  
  assert.equal(result.a.b, 5);
  assert.equal(result.a.self, result.a); // Ensure circular reference is maintained
});

// Test: Numeric keys as strings
test('Numeric keys as strings', () => {
  const obj = {};
  const result = set(obj, 'arr.0', 10);
  
  assert.equal(result, { arr: [10] });
});

test.run();
