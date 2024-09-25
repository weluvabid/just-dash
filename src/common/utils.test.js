import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { isArray, isFunction, isNumber, isPositiveWholeNumber } from './utils';

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

utilsSuite.run();
