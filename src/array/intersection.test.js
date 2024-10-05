import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import intersection from './intersection';

const intersectionSuite = suite('intersection');

intersectionSuite('should throw an error if the first input is not an array', () => {
  assert.throws(() => intersection(1, [2, 3]), (err) => {
    return err instanceof Error && err.message === 'src must be an array';
  });
});
  
intersectionSuite('should throw an error if the second input is not an array', () => {
  assert.throws(() => intersection([1, 2, 3], '4'), (err) => {
    return err instanceof Error && err.message === 'target must be an array';
  });
});

intersectionSuite('returns empty array for empty input arrays', () => {
  assert.equal(intersection([], []), []);
});

intersectionSuite('returns empty array for single element input arrays without intersection', () => {
  assert.equal(intersection([1], [2]), []);
});

intersectionSuite('returns single element array for single element input arrays with intersection', () => {
  assert.equal(intersection([1], [1]), [1]);
});

intersectionSuite('returns intersecting elements for multiple element input arrays', () => {
  assert.equal(intersection([1, 2, 3], [2, 3, 4]), [2, 3]);
});

intersectionSuite('returns empty array for multiple element input arrays without intersection', () => {
  assert.equal(intersection([1, 2, 3], [4, 5, 6]), []);
});

intersectionSuite('handles input arrays with duplicate elements', () => {
  assert.equal(intersection([1, 2, 2, 3], [2, 3, 4]), [2, 3]);
});

intersectionSuite('handles input arrays with different data types', () => {
  assert.equal(intersection([1, '2', true], [1, '2']), [1, '2']);
});

intersectionSuite.run();
