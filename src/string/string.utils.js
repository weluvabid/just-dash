import { isArray, isString, isUndefined } from "../common/utils";

import { CAPITAL_LETTER_SYM, OPERATORS_MAP, REGEXP_ESCAPE_CHARS } from "./string.constants";

function isCapitalLetter(c) {
  if (isString(c)) {
  	return c === c.toUpperCase() && c !== c.toLowerCase();
  }
  
  return false;
}

export function extractOperators(str) {
  const operators = new Set();

  if (!isString(str)) {
  	return operators;
  }
  
  for (let i = 0; i < str.length; i += 1) {
  	const char = str[i];
    
    if (OPERATORS_MAP.has(char)) {
    	operators.add(char);
    } else if (isCapitalLetter(char)) {
    	operators.add(CAPITAL_LETTER_SYM);
    }
  }
  
  return operators;
}

export function applyTransformation(segments, delimiter, replacement = '') {
  if (!isArray(segments) || segments.length === 0) {
    return '';
  }

  if (isUndefined(delimiter)) {
    return segments.join(replacement);
  }

  const isDelimiterAtFirstIndex = segments[0] === delimiter;
  let transformedString = isDelimiterAtFirstIndex ? segments[0] : '';
  let previousDelimiterLength = 0;
  let currentIndex = Number(isDelimiterAtFirstIndex);

  for (; currentIndex < segments.length; currentIndex += 1) {
    const segment = segments[currentIndex];

    if (previousDelimiterLength === 1) {
      transformedString += (replacement + segment);
    } else if (segment[0] !== delimiter || segment.length !== 1) {
      transformedString += segment;
    }

    previousDelimiterLength = segment[0] === delimiter ? segment.length : 0;
  }

  return transformedString;
}


export function createRegExpForOperator(operator) {
  if (!isString(operator)) {
  	return null;
  }

  const normalizedOperator = REGEXP_ESCAPE_CHARS.has(operator) ? `\\${operator}` : operator;

  return new RegExp((`[${normalizedOperator}]+)|((?!${normalizedOperator})[^${normalizedOperator}]+)`, 'gm'));
}
