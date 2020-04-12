export declare class DeserialiseBucketError {
    name: string;
    message?: string;
    rootError: Error;
    stack: any;
    constructor(message: string, error: Error);
}
