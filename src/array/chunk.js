import withValidator from "../common/with-validator";

import { chunkValidators } from "./chunk.constants";

function chunk(array, size) {
    if (size === 0) {
        return array.map(() => []);
    }

    const chunks = Array(Math.ceil(array.length / size));

    for (let i = 0, j = 0; i < array.length; i += size, j += 1) {
        chunks[j] = array.slice(i, i + size);
    }

    return chunks;
}

export default withValidator(chunk, chunkValidators);
