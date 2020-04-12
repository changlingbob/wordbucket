"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = __importDefault(require("./manager"));
var bucket_1 = require("./bucket");
exports.Bucket = bucket_1.default;
var errors_1 = require("./errors");
exports.DuplicateNameError = errors_1.DuplicateNameError;
exports.MissingBucketError = errors_1.MissingBucketError;
exports.default = manager_1.default;
