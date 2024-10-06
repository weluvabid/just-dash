import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import difference from './difference';

const differenceSuite = suite('difference');

differenceSuite('should throw an error if the input is not an array', () => {
  assert.throws(() => difference(1, [2, 3]), (err) => {
    return err instanceof Error && err.message === 'src must be an array';
  });
  assert.throws(() => difference([1, 2, 3], '4'), (err) => {
    return err instanceof Error && err.message === 'target must be an array';
  });
});

differenceSuite('should return the difference between two arrays', () => {
  const array1 = [1, 2, 3, 4];
  const array2 = [2, 3, 5];
  const result = difference(array1, array2);

  assert.equal(result, [1, 4]);
});

differenceSuite('should return an empty array if there is no difference', () => {
  const array1 = [1, 2, 3];
  const array2 = [1, 2, 3];
  const result = difference(array1, array2);
  
  assert.equal(result, []);
});

differenceSuite('should handle arrays with duplicate elements', () => {
  const array1 = [1, 2, 2, 3];
  const array2 = [2, 3];
  const result = difference(array1, array2);
  
  assert.equal(result, [1]);
});

differenceSuite('should handle arrays with different data types', () => {
  const array1 = [1, '2', true];
  const array2 = [1, '2'];
  const result = difference(array1, array2);
  
  assert.equal(result, [true]);
});

differenceSuite.run();
