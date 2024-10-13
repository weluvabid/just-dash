import { isString } from "../common/utils";

import { CAPITAL_LETTER_SYM, OPERATORS_MAP } from "./string.constants";

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
