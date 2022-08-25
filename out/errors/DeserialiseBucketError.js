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
var DeserialiseBucketError = /** @class */ (function (_super) {
    __extends(DeserialiseBucketError, _super);
    function DeserialiseBucketError(message, error) {
        var _this = _super.call(this, message) || this;
        _this.name = 'DeserialiseBucketError';
        _this.message = message || "Couldn't parse json";
        _this.rootError = error;
        return _this;
    }
    return DeserialiseBucketError;
}(Error));
export { DeserialiseBucketError };
//# sourceMappingURL=DeserialiseBucketError.js.map