import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import uniq from './uniq';

const uniqSuite = suite('uniq');

uniqSuite('should throw an error if the input is not an array', () => {
    assert.throws(() => uniq(1), (err) => {
        return err instanceof Error && err.message === 'Input must be an array';
    });
    assert.throws(() => uniq(undefined), (err) => {
        return err instanceof Error && err.message === 'Input must be an array';
    });
    assert.throws(() => uniq(null), (err) => {
        return err instanceof Error && err.message === 'Input must be an array';
    });
});

uniqSuite('should return an empty array if the input is an empty array', () => {
    assert.equal(uniq([]), []);
});

uniqSuite('should return the original array if it does not have duplicates', () => {
    assert.equal(uniq([1, 2, 3, 4, 5, 6, 7, 8, 9]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

uniqSuite('should remove duplicates from an array', () => {
    assert.equal(uniq([1, 4, 5, 4, 4, 5, 6, 7, 6, 5]), [1, 4, 5, 6, 7]);
});

uniqSuite.run();
