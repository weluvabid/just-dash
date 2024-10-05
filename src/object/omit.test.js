import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import omit from './omit';

const omitSuite = suite('omit');

// Basic test cases
omitSuite('should omit a single key from a flat object', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const result = omit(obj, ['b']);
  assert.equal(result, { a: 1, c: 3 });
});

omitSuite('should omit multiple keys from a flat object', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const result = omit(obj, ['a', 'c']);
  assert.equal(result, { b: 2 });
});

omitSuite('should return the original object if no keys are provided', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const result = omit(obj, []);
  assert.equal(result, obj);
});

// Nested object cases
omitSuite('should omit a nested key from an object', () => {
  const obj = { a: { b: { c: 1, d: 2 } }, e: 3 };
  const result = omit(obj, ['a.b.c']);
  assert.equal(result, { a: { b: { d: 2 } }, e: 3 });
});

omitSuite('should omit multiple nested keys from an object', () => {
  const obj = { a: { b: { c: 1, d: 2 } }, e: 3 };
  const result = omit(obj, ['a.b.c', 'e']);
  assert.equal(result, { a: { b: { d: 2 } } });
});

// Array cases
omitSuite('should omit a key from an array', () => {
  const obj = { a: [1, 2, 3], b: 2 };
  const result = omit(obj, ['a.1']);
  assert.equal(result, { a: [1, , 3], b: 2 });
});

omitSuite('should omit multiple keys from arrays in nested objects', () => {
  const obj = { a: [1, 2, 3], b: { c: [4, 5, 6] } };
  const result = omit(obj, ['a.2', 'b.c.1']);
  assert.equal(result, { a: [1, 2], b: { c: [4, , 6] } });
});

// Edge cases
omitSuite('should return an empty object when omitting all keys', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const result = omit(obj, ['a', 'b', 'c']);
  assert.equal(result, {});
});

omitSuite('should handle an empty object correctly', () => {
  const obj = {};
  const result = omit(obj, ['a']);
  assert.equal(result, {});
});

omitSuite('should return the original object when omitting non-existent keys', () => {
  const obj = { a: 1, b: 2 };
  const result = omit(obj, ['x', 'y']);
  assert.equal(result, obj);
});

// Symbol cases
omitSuite('should omit a symbol key from an object', () => {
  const sym = Symbol('test');
  const obj = { a: 1, [sym]: 2 };
  const result = omit(obj, [sym]);
  assert.equal(result, { a: 1 });
});

omitSuite('should omit a symbol key from a nested object', () => {
  const sym = Symbol('test');
  const obj = { a: { [sym]: 2 }, b: 3 };
  const result = omit(obj, ['a.' + sym.toString()]);
  assert.equal(result, { a: {}, b: 3 });
});

// Set cases
omitSuite('should omit a key with a Set', () => {
  const obj = { a: new Set([1, 2, 3]), b: 2 };
  const result = omit(obj, ['a']);
  assert.equal(result, { b: 2 });
});

// Map cases
omitSuite('should omit a key with a Map', () => {
  const obj = { a: new Map([[1, 'one'], [2, 'two']]), b: 2 };
  const result = omit(obj, ['a']);
  assert.equal(result, { b: 2 });
});

omitSuite('should handle nested Map objects', () => {
  const obj = { a: new Map([[1, 'one'], [2, 'two']]), b: { c: new Map([[3, 'three']]) } };
  const result = omit(obj, ['b.c']);
  assert.equal(result, { a: new Map([[1, 'one'], [2, 'two']]), b: {} });
});

// Date cases
omitSuite('should omit a Date object', () => {
  const obj = { a: new Date(), b: 2 };
  const result = omit(obj, ['a']);
  assert.equal(result, { b: 2 });
});

omitSuite('should omit a nested Date object', () => {
  const obj = { a: { b: new Date() }, c: 3 };
  const result = omit(obj, ['a.b']);
  assert.equal(result, { a: {}, c: 3 });
});

// Circular reference cases
omitSuite('should handle circular references without errors', () => {
  const obj = { a: 1 };
  obj.b = obj;
  const result = omit(obj, ['a']);
  assert.equal(result, { b: obj });
});

omitSuite('should handle nested circular references without errors', () => {
  const obj = { a: { b: 2 } };
  obj.a.c = obj;
  const result = omit(obj, ['a.b']);
  assert.equal(result, { a: { c: obj } });
});

// Additional Test Cases for Invalid Input
omitSuite('should return the original object when keys are not an array', () => {
  const obj = { a: 1, b: 2, c: 3 };

  const result1 = omit(obj, null);
  assert.equal(result1, obj);

  const result2 = omit(obj, undefined);
  assert.equal(result2, obj);

  const result3 = omit(obj, {});
  assert.equal(result3, obj);

  const result4 = omit(obj, 'a');
  assert.equal(result4, obj);
});

omitSuite('should return the original object if the keys array contains non-string or non-symbol elements', () => {
  const obj = { a: 1, b: 2, c: 3 };

  const result1 = omit(obj, [123]);
  assert.equal(result1, obj);

  const result2 = omit(obj, [true]);
  assert.equal(result2, obj);

  const result3 = omit(obj, [null]);
  assert.equal(result3, obj);

  const result4 = omit(obj, [undefined]);
  assert.equal(result4, obj);

  const result5 = omit(obj, [{}]);
  assert.equal(result5, obj);
});

omitSuite('should return the original object when a non-object or non-array is passed as the input object', () => {
  const result1 = omit(123, ['a']);
  assert.equal(result1, 123);

  const result2 = omit(null, ['a']);
  assert.equal(result2, null);

  const result3 = omit(undefined, ['a']);
  assert.equal(result3, undefined);

  const result4 = omit('string', ['a']);
  assert.equal(result4, 'string');
});

omitSuite('should return an empty object or array if the input is empty and valid keys are provided', () => {
  const result1 = omit({}, ['a']);
  assert.equal(result1, {});

  const result2 = omit([], ['a']);
  assert.equal(result2, []);
});

omitSuite('should handle invalid paths in a nested structure gracefully', () => {
  const obj = { a: { b: 1 }, c: 2 };

  const result1 = omit(obj, ['a.b.c']);
  assert.equal(result1, obj); // Invalid path should return the original object

  const result2 = omit(obj, ['a.x']);
  assert.equal(result2, obj);

  const result3 = omit(obj, ['x.y.z']);
  assert.equal(result3, obj);
});

// Run the test suite
omitSuite.run();
