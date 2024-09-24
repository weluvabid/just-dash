import { isArray, isFunction } from "./utils";

export default function withValidator(fn, validators = []) {
    if (!isFunction(fn)) {
        throw new Error('First argument (target) must be a function');
    }

    if (!isArray(validators)) {
        throw new Error('Second argument (validators) must be an array');
    }

    const fnArgsLength = fn.length;

    if (validators.length !== fnArgsLength) {
        throw new Error(`The number of validators (${validators.length}) must be equal to the number of function arguments (${fn.length})`);
    }

    return function $withValidators(...args) {
        for (let i = 0; i < validators.length; i += 1) {
            const validatorFn = validators[i];

            if (!isFunction(validatorFn)) {
                throw new Error(`Validator at index ${i} must be a function`);
            }

            if (!validatorFn(args[i])) {
                throw new Error(`Validator at index ${i} failed`);
            }
        }

        return fn(...args);
    }
}
