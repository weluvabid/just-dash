import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import compact from './compact';

const compactSuite = suite('compact');

compactSuite('should throw an error if the input is not an array', () => {
  assert.throws(() => compact(1), (err) => {
    return err instanceof Error && err.message === 'Input must be an array';
  });
});

compactSuite('should return an empty array if the input is an empty array', () => {
  assert.equal(compact([]), []);
});

compactSuite('should return an empty array if the input is an array of falsy values', () => {
  assert.equal(compact([false, 0, '', null, undefined, NaN]), []);
});

compactSuite('should return the input if the input is an array of truthy values', () => {
  assert.equal(compact([1, 2, 3, 4, 5, 6, 7, 8, 9]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

compactSuite('should return truthy values only', () => {
  assert.equal(compact([false, 0, '', null, undefined, NaN, 1, 2, 3, 4, 5, 6, 7, 8, 9]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

compactSuite.run();
