export const MAX_FILE_SIZE = 52428800; // 50MB in bytes
export const TIMEOUT = 30000; // 30 seconds
export const RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000;

export const ERROR_MESSAGES = {
    FILE_TOO_LARGE: 'File size exceeds the maximum limit of 50MB',
    UNAUTHORIZED: 'Authentication required to access this resource',
    FORBIDDEN: 'Access to this resource is forbidden',
    NOT_FOUND: 'Resource not found',
    TIMEOUT: 'Request timed out',
    NETWORK_ERROR: 'Network error occurred',
    UNKNOWN: 'An unknown error occurred'
};
