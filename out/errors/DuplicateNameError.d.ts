import Bucket from "../bucket";
export declare class DuplicateNameError {
    name: string;
    message?: string;
    duplicate: Bucket;
    stack: any;
    constructor(message: string, bucket: Bucket);
}
