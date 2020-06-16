export const isString = (variable) => typeof variable === 'string' || variable instanceof String;

export const capitalizeWords = (str) => {
    return str.replace(
        /\w\S*/g,
        (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(),
    );
};

export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default { isString, capitalizeWords, isEmptyObject };
