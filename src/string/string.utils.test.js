import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { CAPITAL_LETTER_SYM } from './string.constants';
import { extractOperators } from './string.utils';

const extractOperatorsSuite = suite('extractOperators');

extractOperatorsSuite('should return operators from a simple string', () => {
  const result = extractOperators('hello_world');
  assert.equal([...result], ['_']);
});

extractOperatorsSuite('should return multiple operators', () => {
  const result = extractOperators('hello-world_GeoLocation');
  assert.equal([...result], ['-', '_', CAPITAL_LETTER_SYM]);
});

extractOperatorsSuite('should handle strings without operators', () => {
  const result = extractOperators('HelloWorld');
  assert.equal([...result], [CAPITAL_LETTER_SYM]);
});

extractOperatorsSuite('should return an empty set for an empty string', () => {
  const result = extractOperators('');
  assert.equal([...result], []);
});

extractOperatorsSuite('should handle non-string inputs gracefully', () => {
  const result = extractOperators(12345);
  assert.equal([...result], []);
});

// Test cases for extractOperators only
extractOperatorsSuite('handles Latin letters and operators', () => {
  // extractOperators tests with Latin characters and symbols
  assert.equal(extractOperators('hello_world'), new Set(['_']), 'Single underscore operator detected');
  assert.equal(extractOperators('hello-world'), new Set(['-']), 'Single dash operator detected');
  assert.equal(extractOperators('HelloWorld'), new Set([CAPITAL_LETTER_SYM]), 'Capital letters detected');
  assert.equal(extractOperators('Hello-World_good'), new Set([CAPITAL_LETTER_SYM, '-', '_']), 'Multiple operators detected');
});
  
// extractOperatorsSuite('handles non-Latin characters', () => {
//   // extractOperators tests for non-Latin characters
//   assert.equal(extractOperators('Привет_мир'), new Set(['_']), 'Underscore operator with Cyrillic characters detected');
//   assert.equal(extractOperators('你好-世界'), new Set(['-']), 'Dash operator with Chinese characters detected');
//   assert.equal(extractOperators('ΓειάΣου'), new Set([CAPITAL_LETTER_SYM]), 'Capital letters with Greek characters detected');
// });
  
extractOperatorsSuite('handles mixed operators and capital letters', () => {
  assert.equal(extractOperators('Hello_World-Good'), new Set([CAPITAL_LETTER_SYM, '_', '-']), 'Handles mixed operators and capital letters');
  assert.equal(extractOperators('hello_world-good'), new Set(['_', '-']), 'Handles underscore and dash operators');
  assert.equal(extractOperators('Hello-World'), new Set([CAPITAL_LETTER_SYM, '-']), 'Handles capital letters and dash operator');
});
  
extractOperatorsSuite('handles edge cases', () => {
  // Empty string should return an empty set
  assert.equal(extractOperators(''), new Set(), 'Empty string returns empty set');
    
  // String without any operators should return only capital letter symbol (if applicable)
  assert.equal(extractOperators('Hello'), new Set([CAPITAL_LETTER_SYM]), 'Capital letters only detected');
  assert.equal(extractOperators('helloworld'), new Set(), 'No operators or capital letters detected');
});
  

extractOperatorsSuite.run();
