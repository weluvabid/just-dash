import withValidator from "../common/with-validator";

import { zipValidators } from "./zip.constants";

function zip(...args) {
  if (args.length === 0) {
    return [];
  }

  const minLength = Math.min(...(args.map((array) => array.length)));
  const zippedArray = Array(minLength);

  let i = 0;

  while (i < minLength) {
    const row = Array(args.length);

    for (let j = 0; j < args.length; j += 1) {
      row[j] = args[j][i];
    }

    zippedArray[i] = row;
    i += 1;
  }

  return zippedArray
}

export default withValidator(zip, zipValidators);
