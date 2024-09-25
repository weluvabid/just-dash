import withValidator from "../common/with-validator";

import { flattenValidators } from "./flatten.constants";

function flatten(array) {
	const flattenedArray = [];
  
  for (let i = 0; i < array.length; i += 1) {
  	if (Array.isArray(array[i])) {
    	flattenedArray.push(...array[i]);
    } else {
    	flattenedArray.push(array[i]);
    }
  }
  
  return flattenedArray;
}

export default withValidator(flatten, flattenValidators)
