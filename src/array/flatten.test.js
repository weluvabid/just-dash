import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import flatten from './flatten';

const flattenSuite = suite('flatten');

flattenSuite('should throw an error if the input is not an array', () => {
  assert.throws(() => flatten(1), (err) => {
    return err instanceof Error && err.message === 'Input must be an array';
  });
  assert.throws(() => flatten(undefined), (err) => {
    return err instanceof Error && err.message === 'Input must be an array';
  });
  assert.throws(() => flatten(null), (err) => {
    return err instanceof Error && err.message === 'Input must be an array';
  });
});

flattenSuite('should return an empty array if the input is an empty array', () => {
  assert.equal(flatten([]), []);
});

flattenSuite('should flatten a nested array by one level', () => {
  assert.equal(flatten([1, [2, 3], 4, [5, 6, [7, 8, [9, 10]]]]), [1, 2, 3, 4, 5, 6, [7, 8, [9, 10]]]);
});

flattenSuite('should return the original array if it is not nested', () => {
  assert.equal(flatten([1, 2, 3, 4, 5, 6, 7, 8, 9]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

flattenSuite.run();
