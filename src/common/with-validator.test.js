import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import withValidator from './with-validator';

const noop = () => {};
const validValidator = () => true;
const throwsValidator = () => { throw new Error('blah blah blah'); };
const notAFn = 1;
const withValidatorSuite = suite('with-validator');


withValidatorSuite('should throw if target is not a function', () => {
    assert.throws(() => withValidator(notAFn, []), (err) => {
        return err instanceof Error && err.message === 'First argument (target) must be a function';
    });
});

withValidatorSuite('should throw if validators is not an array', () => {
    assert.throws(() => withValidator(noop, notAFn), (err) => {
        return err instanceof Error && err.message === 'Second argument (validators) must be an array';
    });
});

withValidatorSuite('should throw if the number of validators is not equal to the number of function arguments', () => {
    assert.throws(() => withValidator(noop, [noop, noop]), (err) => {
        return err instanceof Error && err.message === 'The number of validators (2) must be equal to the number of function arguments (0)';
    });
});

withValidatorSuite('should throw if a validator is not a function', () => {
    assert.throws(() => withValidator((a, b, c) => [a, b, c], [notAFn, noop, notAFn])('a', 'b', 'c'), (err) => {
        return err instanceof Error && err.message === 'Validator at index 0 must be a function';
    });
});

withValidatorSuite('should throw if a validator fails', () => {
    assert.throws(() => withValidator((a, b, c) => [a, b, c], [noop, () => false, noop])('a', 'b', 'c'), (err) => {
        return err instanceof Error && err.message === 'Validator at index 0 failed';
    });
});

withValidatorSuite('should throw if a validator throws', () => {
    assert.throws(() => withValidator((a, b, c) => [a, b, c], [throwsValidator, validValidator, validValidator])('a', 'b', 'c'), (err) => {
        return err instanceof Error && err.message === 'blah blah blah';
    });
});

withValidatorSuite('should not throw if all validators pass', () => {
    assert.not.throws(() => withValidator((a, b, c) => [a, b, c], [validValidator, validValidator, validValidator])('a', 'b', 'c'));
});

withValidatorSuite.run();
