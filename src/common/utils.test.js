import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { hasOwnProperty, isArray, isFunction, isNumber, isObject, isPositiveWholeNumber, isString, isUndefined } from './utils';

const utilsSuite = suite('utils');

utilsSuite('isArray', () => {
  assert.is(isArray([]), true);
  assert.is(isArray(1), false);
  assert.is(isArray({}), false);
});

utilsSuite('isFunction', () => {    
  assert.is(isFunction(() => {}), true);
  assert.is(isFunction(1), false);
  assert.is(isFunction({}), false);
});

utilsSuite('isNumber', () => {
  assert.is(isNumber(1), true);
  assert.is(isNumber('1'), false);
  assert.is(isNumber(-1), true);
  assert.is(isNumber(1.6), true);
});

utilsSuite('isPositiveWholeNumber', () => {
  assert.is(isPositiveWholeNumber(1), true);
  assert.is(isPositiveWholeNumber(0), true);
  assert.is(isPositiveWholeNumber(-1), false);
  assert.is(isPositiveWholeNumber(1.6), false);
});

utilsSuite('isString', () => {
  assert.is(isString(1), false);
  assert.is(isString('1'), true);
  assert.is(isString(''), true);
  assert.is(isString('string'), true);
  assert.is(isString({}), false);
});

utilsSuite('isObject', () => {
  assert.is(isObject({}), true);
  assert.is(isObject([]), false);
  assert.is(isObject(1), false);
});

utilsSuite('isUndefined', () => {
  assert.is(isUndefined(1), false);
  assert.is(isUndefined('1'), false);
  assert.is(isUndefined(''), false);
  assert.is(isUndefined('string'), false);
  assert.is(isUndefined({}), false);
  assert.is(isUndefined(undefined), true);
});

utilsSuite('hasOwnProperty', () => {
  assert.is(hasOwnProperty({ a: 1 }, 'a'), true);
  assert.is(hasOwnProperty({ a: 1 }, 'b'), false);
});

utilsSuite.run();
