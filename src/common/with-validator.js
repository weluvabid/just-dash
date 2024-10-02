import { isArray, isFunction } from "./utils";

export default function withValidator(fn, validators = []) {
    if (!isFunction(fn)) {
        throw new Error('First argument (target) must be a function');
    }

    if (!isArray(validators)) {
        throw new Error('Second argument (validators) must be an array');
    }

    const fnArgsLength = fn.length;
    const isSingleValidator = fnArgsLength === 0 && validators.length === 1;

    if (validators.length !== fnArgsLength && !isSingleValidator) {
        throw new Error(`The number of validators (${validators.length}) must be equal to the number of function arguments (${fn.length})`);
    }

    return function $withValidators(...args) {
        for (let i = 0; i < validators.length; i += 1) {
            const validatorFn = isSingleValidator ? validators[validators.length - 1] : validators[i];

            if (!isFunction(validatorFn)) {
                throw new Error(`Validator at index ${i} must be a function`);
            }

            const arg = isSingleValidator? args : args[i];

            if (!validatorFn(arg)) {
                throw new Error(`Validator at index ${i} failed`);
            }
        }

        return fn(...args);
    }
}
