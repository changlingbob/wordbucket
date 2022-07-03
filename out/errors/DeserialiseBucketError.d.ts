export declare class DeserialiseBucketError extends Error {
    name: string;
    message: string;
    rootError: Error;
    constructor(message: string, error: Error);
}
