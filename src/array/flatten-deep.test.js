import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import flattenDeeep from './flatten-deep';

const flattenDeeepSuite = suite('flatten-deep');

flattenDeeepSuite('should throw an error if the input is not an array', () => {
    assert.throws(() => flattenDeeep(1), (err) => {
        return err instanceof Error && err.message === 'Input must be an array';
    });
    assert.throws(() => flattenDeeep(undefined), (err) => {
        return err instanceof Error && err.message === 'Input must be an array';
    });
    assert.throws(() => flattenDeeep(null), (err) => {
        return err instanceof Error && err.message === 'Input must be an array';
    });
});

flattenDeeepSuite('should return an empty array if the input is an empty array', () => {
    assert.equal(flattenDeeep([]), []);
});

flattenDeeepSuite('should flatten a nested array', () => {
    assert.equal(flattenDeeep([1, [2, 3], 4, [5, 6, [7, 8, [9, 10]]]]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

flattenDeeepSuite('should return the original array if it is not nested', () => {
    assert.equal(flattenDeeep([1, 2, 3, 4, 5, 6, 7, 8, 9]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

flattenDeeepSuite.run();
