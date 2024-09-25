import { isArray } from "../common/utils";

export const uniqValidators = [
    (input) => {
        if (!isArray(input)) {
            throw new Error('Input must be an array');
        }

        return true;
    }
];
