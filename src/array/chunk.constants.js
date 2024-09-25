import { isArray, isPositiveWholeNumber } from "../common/utils";

export const chunkValidators = [
    (input) => {
        if (!isArray(input)) {
            throw new Error('Input must be an array');
        }

        return true;
    },
    (size) => {
        if (!isPositiveWholeNumber(size)) {
            throw new Error('Size must be a positive whole number');
        }

        return true;
    }
];
