"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.DuplicateNameError = void 0;
var DuplicateNameError = /** @class */ (function (_super) {
    __extends(DuplicateNameError, _super);
    function DuplicateNameError(message, bucket) {
        var _this = _super.call(this, message) || this;
        _this.name = 'DuplicateNameError';
        _this.message = message || 'Duplicate name!';
        _this.duplicate = bucket;
        return _this;
    }
    return DuplicateNameError;
}(Error));
exports.DuplicateNameError = DuplicateNameError;
//# sourceMappingURL=DuplicateNameError.js.map