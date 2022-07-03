import { Bucket } from '../bucket';
export declare class DuplicateNameError extends Error {
    name: string;
    message: string;
    duplicate: Bucket;
    constructor(message: string, bucket: Bucket);
}
