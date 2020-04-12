import Bucket from "./Bucket";
export declare class DuplicateNameError {
    name: string;
    message?: string;
    duplicate: Bucket;
    stack: any;
    constructor(message: string, bucket: Bucket);
}
