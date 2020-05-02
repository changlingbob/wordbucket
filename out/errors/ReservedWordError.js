"use strict";
// This works where other, more comprehensible custom errors don't.
Object.defineProperty(exports, "__esModule", { value: true });
var ReservedWordError = /** @class */ (function () {
    function ReservedWordError(message, title) {
        this.name = "ReservedWordError";
        this.message = message || "Invalid bucket title!";
        this.title = title;
        this.stack = (new Error()).stack;
    }
    return ReservedWordError;
}());
exports.ReservedWordError = ReservedWordError;
ReservedWordError.prototype = Object.create(Error.prototype);
ReservedWordError.prototype.constructor = ReservedWordError;
