"use strict";
// This works where other, more comprehensible custom errors don't.
Object.defineProperty(exports, "__esModule", { value: true });
var MissingBucketError = /** @class */ (function () {
    function MissingBucketError(message, title) {
        this.name = "MissingBucketError";
        this.message = message || "Bucket not found!";
        this.title = title;
        this.stack = (new Error()).stack;
    }
    return MissingBucketError;
}());
exports.MissingBucketError = MissingBucketError;
MissingBucketError.prototype = Object.create(Error.prototype);
MissingBucketError.prototype.constructor = MissingBucketError;
