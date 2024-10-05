import withValidator from '../common/with-validator';

import { compactValidators, falsySet } from './compact.constants';

function compact(array) {
  const res = [];
  
  for (let i = 0; i < array.length; i += 1) {
  	if (!falsySet.has(array[i])) {
    	res.push(array[i]);
    }
  }
  
  return res;
}

export default withValidator(compact, compactValidators);
