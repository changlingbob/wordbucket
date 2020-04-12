"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This works where other, more comprehensible custom errors don't.
var DuplicateNameError = /** @class */ (function () {
    function DuplicateNameError(message, bucket) {
        this.name = "DuplicateNameError";
        this.message = message || "Duplicate name!";
        this.duplicate = bucket;
        this.stack = (new Error()).stack;
    }
    return DuplicateNameError;
}());
exports.DuplicateNameError = DuplicateNameError;
DuplicateNameError.prototype = Object.create(Error.prototype);
DuplicateNameError.prototype.constructor = DuplicateNameError;
