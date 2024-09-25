import withValidator from "../common/with-validator";
import { chunkValidators } from "./constants";

function chunk(array, size) {
    if (size === 0) {
        return array.map(() => []);
    }

    const chunked = [];

    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }

    return chunked;
}

export default withValidator(chunk, chunkValidators);
