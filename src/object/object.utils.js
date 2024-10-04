import { isString } from "../common/utils";

import { KEY_REGEX } from "./object.constants";

export function extractKeys(input) {
    if (typeof input === 'symbol') {
        return [input];
    }
    
    if (arguments.length === 0 || !isString(input)) {
        return [];
    }

    KEY_REGEX.lastIndex = 0; // Ensure regex state is reset

    const keys = [];
    let key;
    
    while ((key = KEY_REGEX.exec(input)) !== null) {
        const [, matchedKey] = key;

        keys.push(matchedKey);
    }

    return keys;
}
