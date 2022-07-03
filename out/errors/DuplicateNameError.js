export class DuplicateNameError extends Error {
    constructor(message, bucket) {
        super(message);
        this.name = 'DuplicateNameError';
        this.message = message || 'Duplicate name!';
        this.duplicate = bucket;
    }
}
//# sourceMappingURL=DuplicateNameError.js.map