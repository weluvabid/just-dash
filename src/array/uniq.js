import withValidator from "../common/with-validator";

import { uniqValidators } from "./uniq.constants";

function uniq(array) {
	return Array.from(new Set(array));
}

export default withValidator(uniq, uniqValidators);
