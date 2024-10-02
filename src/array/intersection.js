import withValidator from "../common/with-validator";

import { intersectionValidators } from "./intersection.constants";

function intersection(src, target) {
	if (target.length === 0 || src.length === 0) {
  	return [];
  }
  
	const set = new Set(target);
  const intersectingArray = new Set();
  
  for (let i = 0; i < src.length; i += 1) {
  	if (set.has(src[i])) {
    	intersectingArray.add(src[i]);
    }
  }
  
  return [...intersectingArray];
}

export default withValidator(intersection, intersectionValidators);
