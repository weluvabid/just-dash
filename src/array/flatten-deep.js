import withValidator from "../common/with-validator";

import { flattenDeepValidators } from "./flatten-deep.constants";

function flattenDeep(array) {
  const flattenedArray = [];
  
  for (let i = 0; i < array.length; i += 1) {
  	if (Array.isArray(array[i])) {
    	flattenedArray.push(...flattenDeep(array[i]));
    } else {
    	flattenedArray.push(array[i]);
    }
  }
  
  return flattenedArray;
}

export default withValidator(flattenDeep, flattenDeepValidators);
