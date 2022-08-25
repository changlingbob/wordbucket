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
var SetVariableError = /** @class */ (function (_super) {
    __extends(SetVariableError, _super);
    function SetVariableError(message, word) {
        var _this = _super.call(this, message) || this;
        _this.name = 'SetVariableError';
        _this.message = message || "Invalid variable setting encountered in ".concat(word);
        _this.word = word;
        return _this;
    }
    return SetVariableError;
}(Error));
export { SetVariableError };
//# sourceMappingURL=SetVariableError.js.map