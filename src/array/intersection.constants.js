import { isArray } from "../common/utils";

export const falsySet = new Set([false, 0, '', null, undefined, NaN]);

export const intersectionValidators = [
    (input) => {
        if (!isArray(input)) {
            throw new Error('src must be an array');
        }
        
        return true;
    },
    (input) => {
        if (!isArray(input)) {
            throw new Error('target must be an array');
        }
        
        return true;
    }
];
