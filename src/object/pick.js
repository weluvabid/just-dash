import { KEY_MISSING_SYM } from './object.constants';
import { extractKeys } from './object.utils';
import { pickHelper, createPickableObject } from './pick.utils';
import merge from './merge';

export default function pick(obj, keys) {
    if (!Array.isArray(keys) || keys.length === 0) {
        return obj;
    }

    return keys.reduce(
        (pickedObj, key) => {
            const extractedKeys = extractKeys(key);

            if (extractedKeys.length === 0) {
                return pickedObj;
            }

            const newPickedObj = pickHelper(new WeakSet(), obj, extractedKeys);

            return newPickedObj !== KEY_MISSING_SYM
                ? merge(pickedObj, newPickedObj) 
                : pickedObj
        },
        createPickableObject(obj)
    );
}
