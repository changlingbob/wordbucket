"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.Word = exports.MissingBucketError = exports.DuplicateNameError = exports.Bucket = exports.WordManager = void 0;
var manager_1 = require("./manager");
__createBinding(exports, manager_1, "WordManager");
var bucket_1 = require("./bucket");
__createBinding(exports, bucket_1, "Bucket");
var errors_1 = require("./errors");
__createBinding(exports, errors_1, "DuplicateNameError");
__createBinding(exports, errors_1, "MissingBucketError");
var word_1 = require("./word");
__createBinding(exports, word_1, "Word");
__exportStar(require("./utils"), exports);
//# sourceMappingURL=index.js.map