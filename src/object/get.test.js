import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import get from './get';

const getSuite = suite('get');

getSuite('should return the value for a valid key path', () => {
  const obj = { a: { b: { c: 42 } } };
  const result = get(obj, 'a.b.c');

  assert.equal(result, 42);
});

getSuite('should return the default value for a non-existent key path', () => {
  const obj = { a: { b: { c: 42 } } };
  const result = get(obj, 'a.b.x', 'default');
  
  assert.equal(result, 'default');
});

getSuite('should return the default value if the object is null or undefined', () => {
  const resultNull = get(null, 'a.b.c', 'default');
  
  assert.equal(resultNull, 'default');

  const resultUndefined = get(undefined, 'a.b.c', 'default');
  
  assert.equal(resultUndefined, 'default');
});

getSuite('should return the default value when keys are empty', () => {
  const obj = { a: { b: { c: 42 } } };
  const result = get(obj, '', 'default');
  
  assert.equal(result, 'default');
});

getSuite('should return undefined when no keys are provided', () => {
  const obj = { a: { b: { c: 42 } } };
  const result = get(obj, null);
  
  assert.equal(result, undefined);
});

getSuite('should return undefined for an empty key path', () => {
  const obj = { a: { b: { c: 42 } } };
  const result = get(obj, []);
  
  assert.equal(result, undefined); 
});

getSuite('should return undefined when accessing properties on non-objects', () => {
  const obj = { a: 1, b: 2 };
  const result = get(obj, 'a.b.c');
  
  assert.equal(result, undefined);
});

getSuite('should return undefined for an empty object or array when no valid key is provided', () => {
  assert.equal(get({}, 'a'), undefined); // {} for object
  assert.equal(get([], '0'), undefined); // [] for array
});

getSuite('should return the default value for invalid key types', () => {
  const obj = { a: { b: { c: 42 } } };
  
  assert.equal(get(obj, 123, 'default'), 'default'); // Invalid key type
  assert.equal(get(obj, true, 'default'), 'default'); // Invalid key type
});

getSuite.run();
