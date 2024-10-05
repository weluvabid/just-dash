import withValidator from "../common/with-validator";

import { differenceValidators } from "./difference.constants";

function difference(src, target) {
  if (target.length === 0) {
  	return [...src];
  }
  
  const set = new Set(target);
  const differenceArray = [];
  
  for (let i = 0; i < src.length; i += 1) {
  	if (!set.has(src[i])) {
    	differenceArray.push(src[i]);
    }
  }
  
  return differenceArray;
}

export default withValidator(difference, differenceValidators);
