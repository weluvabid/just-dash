import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import chunk from './chunk';

const chunkSuite = suite('chunk');

chunkSuite('should throw an error if the input is not an array', () => {
    assert.throws(() => chunk(1, 2), (err) => {
        return err instanceof Error && err.message === 'Input must be an array';
    });
});

chunkSuite('should throw an error if size is not a valid whole number', () => {
    assert.throws(() => chunk([1, 2, 3], '2'), (err) => {
        return err instanceof Error && err.message === 'Size must be a positive whole number';
    });
    assert.throws(() => chunk([1, 2, 3], -1), (err) => {
        return err instanceof Error && err.message === 'Size must be a positive whole number';
    });
    assert.throws(() => chunk([1, 2, 3], 2.4), (err) => {
        return err instanceof Error && err.message === 'Size must be a positive whole number';
    });
});

chunkSuite('should return an array of empty arrays if size is 0', () => {
    assert.equal(chunk([1, 2, 3], 0), [[], [], []]);
});

chunkSuite('should return chunks of the specified size', () => {
    assert.equal(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
});

chunkSuite('should handle remaining elements if array length is not divisible by size', () => {
    assert.equal(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 4), [[1, 2, 3, 4], [5, 6, 7, 8], [9]]);
});

chunkSuite('should return the entire array as a single chunk if size is greater than or equal to the array length', () => {
    assert.equal(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 10), [[1, 2, 3, 4, 5, 6, 7, 8, 9]]);
});

chunkSuite.run();
