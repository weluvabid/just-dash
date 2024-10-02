import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import zip from './zip';

const zipSuite = suite('zip');

zipSuite('should return an empty array when no arguments are provided', () => {
  assert.equal(zip(), []);
});

zipSuite('should return an empty array when a single empty array is provided', () => {
  assert.equal(zip([]), []);
});

zipSuite('should return a zipped array with a single element', () => {
  assert.equal(zip([1], [2]), [[1, 2]]);
});

zipSuite('should return a zipped array with multiple elements', () => {
  assert.equal(zip([1, 2, 3], [4, 5, 6]), [[1, 4], [2, 5], [3, 6]]);
});

zipSuite('should return a zipped array with arrays of different lengths', () => {
  assert.equal(zip([1, 2, 3], [4, 5]), [[1, 4], [2, 5]]);
});

zipSuite('should return a zipped array with multiple arrays', () => {
  assert.equal(zip([1, 2, 3], [4, 5, 6], [7, 8, 9]), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
});

zipSuite('should throw an error if any of the inputs are not arrays', () => {
  assert.throws(() => zip(1, [2, 3]), (err) => {
    return err instanceof Error && err.message === 'Input must be an array';
  });
});

zipSuite.run();
