import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { isObject } from '../common/utils'; 

import map from './map'; 

const mapSuite = suite('map');

mapSuite('should map over an array', () => {
  const arr = [1, 2, 3];
  const result = map(arr, x => x * 2);

  assert.equal(result, [2, 4, 6]);
});

mapSuite('should map over an object', () => {
  const obj = { a: 1, b: 2 };
  const result = map(obj, x => x + 1);

  assert.equal(result, { a: 2, b: 3 });
});

mapSuite('should map over a Map', () => {
  const mapInstance = new Map([['a', 1], ['b', 2]]);
  const result = map(mapInstance, x => x * 2);

  assert.equal(result, new Map([['a', 2], ['b', 4]]));
});

mapSuite('should map over a Set', () => {
  const set = new Set([1, 2, 3]);
  const result = map(set, x => x + 1);

  assert.equal(result, new Set([2, 3, 4]));
});

mapSuite('should return an empty array when mapping an empty array', () => {
  const arr = [];
  const result = map(arr, x => x * 2);

  assert.equal(result, []);
});

mapSuite('should return an empty object when mapping an empty object', () => {
  const obj = {};
  const result = map(obj, x => x + 1);

  assert.equal(result, {});
});

mapSuite('should return an empty Map when mapping an empty Map', () => {
  const mapInstance = new Map();
  const result = map(mapInstance, x => x * 2);

  assert.equal(result, new Map());
});

mapSuite('should return an empty Set when mapping an empty Set', () => {
  const set = new Set();
  const result = map(set, x => x + 1);

  assert.equal(result, new Set());
});

mapSuite('should return null when mapping an unsupported type', () => {
  const unsupported = 42; // A number, which should return null
  const result = map(unsupported, x => x * 2);

  assert.equal(result, null);
});

mapSuite('should map over a complex nested object', () => {
  const complexObj = { a: { b: 1 }, c: 2 };
  const result = map(complexObj, x => isObject(x) ? { ...x, b: x.b + 1 } : x + 1);

  assert.equal(result, { a: { b: 2 }, c: 3 });
});

mapSuite('should map over an array of objects', () => {
  const arrOfObjs = [{ value: 1 }, { value: 2 }];
  const result = map(arrOfObjs, obj => ({ ...obj, value: obj.value * 2 }));

  assert.equal(result, [{ value: 2 }, { value: 4 }]);
});

mapSuite('should map over an object containing an array', () => {
  const objWithArr = { a: [1, 2], b: 3 };
  const result = map(objWithArr, x => Array.isArray(x) ? x.map(y => y * 2) : x + 1);

  assert.equal(result, { a: [2, 4], b: 4 });
});

mapSuite('should map over a Set containing objects', () => {
  const setWithObjs = new Set([{ value: 1 }, { value: 2 }]);
  const result = map(setWithObjs, obj => ({ ...obj, value: obj.value * 2 }));
  
  assert.equal(result, new Set([{ value: 2 }, { value: 4 }]));
});

mapSuite.run();
