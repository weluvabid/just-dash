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
  
extractOperatorsSuite('handles Latin and non-Latin characters', () => {
  // Latin characters
  assert.equal(extractOperators('Hello_World'), new Set(['_', CAPITAL_LETTER_SYM]), 'Detects underscore and capital letters for Latin');
    
  // Cyrillic characters
  assert.equal(extractOperators('Привет_мир'), new Set(['_', CAPITAL_LETTER_SYM]), 'Detects underscore and capital letters for Cyrillic');
    
  // Greek characters
  assert.equal(extractOperators('ΓειάΣου'), new Set([CAPITAL_LETTER_SYM]), 'Detects capital letters for Greek');
    
  // Chinese characters (no capitals)
  assert.equal(extractOperators('你好世界'), new Set([]), 'Detects no operators for Chinese');
  
  // Mixed cases
  assert.equal(extractOperators('Привет-hello_Γεια'), new Set(['-', '_', CAPITAL_LETTER_SYM]), 'Handles mixed scripts and operators');
});

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
