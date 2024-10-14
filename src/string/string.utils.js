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

export function applyTransformation(strings, operator, replacer = '') {
  if (!isArray(strings)) {
  	return '';
  }
  
  if (isUndefined(operator)) {
  	return strings.join(replacer);
  }
  
  let transformedString = strings[0] === operator ? strings[0] : '';
  let lastLength = 0;
  let i = Number(strings[0] === operator);
  
  for (; i < strings.length; i += 1) {
    const string = strings[i];

    if (lastLength === 1) {
      transformedString += (replacer + string);
    } else if (string[0] !== operator || string.length !== 1) {
      transformedString += string;
    }

    lastLength = string[0] === operator ? string.length : 0
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
