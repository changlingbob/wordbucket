"use strict";
// This works where other, more comprehensible custom errors don't.
Object.defineProperty(exports, "__esModule", { value: true });
var DeserialiseBucketError = /** @class */ (function () {
    function DeserialiseBucketError(message, error) {
        this.name = "DeserialiseBucketError";
        this.message = message || "Couldn't parse json";
        this.rootError = error;
        this.stack = (new Error()).stack;
    }
    return DeserialiseBucketError;
}());
exports.DeserialiseBucketError = DeserialiseBucketError;
DeserialiseBucketError.prototype = Object.create(Error.prototype);
DeserialiseBucketError.prototype.constructor = DeserialiseBucketError;
