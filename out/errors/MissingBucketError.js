export class MissingBucketError extends Error {
    constructor(message, title) {
        super(message);
        this.name = 'MissingBucketError';
        this.message = message || 'Bucket not found!';
        this.title = title;
    }
}
//# sourceMappingURL=MissingBucketError.js.map