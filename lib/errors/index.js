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
exports.__esModule = true;
exports.ReadVariableError = exports.SetVariableError = exports.ReservedWordError = exports.MissingBucketError = exports.DuplicateNameError = exports.DeserialiseBucketError = void 0;
var DeserialiseBucketError_1 = require("./DeserialiseBucketError");
__createBinding(exports, DeserialiseBucketError_1, "DeserialiseBucketError");
var DuplicateNameError_1 = require("./DuplicateNameError");
__createBinding(exports, DuplicateNameError_1, "DuplicateNameError");
var MissingBucketError_1 = require("./MissingBucketError");
__createBinding(exports, MissingBucketError_1, "MissingBucketError");
var ReservedWordError_1 = require("./ReservedWordError");
__createBinding(exports, ReservedWordError_1, "ReservedWordError");
var SetVariableError_1 = require("./SetVariableError");
__createBinding(exports, SetVariableError_1, "SetVariableError");
var ReadVariableError_1 = require("./ReadVariableError");
__createBinding(exports, ReadVariableError_1, "ReadVariableError");
//# sourceMappingURL=index.js.map