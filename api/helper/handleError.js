export const handleError = (staatusCode, message) => {
    const error = new Error;
    error.statusCode = staatusCode;
    error.message = message;
    return error;
};