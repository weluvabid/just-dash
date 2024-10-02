export function isFunction(input) {
    return typeof input === 'function';
}

export function isArray(input) {
    return Array.isArray(input);
}

export function isNumber(input) {
    return typeof input === 'number';
}

export function isString(input) {
    return typeof input === 'string';
}

export function isPositiveWholeNumber(input) {
    return isNumber(input) && input >= 0 && input % 1 === 0;
}
