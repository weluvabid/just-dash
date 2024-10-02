import { isArray } from "../common/utils";

export const zipValidators = [
    (input) => {
        if (!isArray(input) || !input.every(isArray)) {
            throw new Error('Input must be an array');
        }

        return true;
    }
];
