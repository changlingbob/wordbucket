// This works where other, more comprehensible custom errors don't.
export class DeserialiseBucketError extends Error {
    constructor(message, error) {
        super(message);
        this.name = 'DeserialiseBucketError';
        this.message = message || "Couldn't parse json";
        this.rootError = error;
    }
}
//# sourceMappingURL=DeserialiseBucketError.js.map