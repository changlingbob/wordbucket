"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = __importDefault(require("./Manager"));
var bucket_1 = __importDefault(require("../bucket"));
var errors_1 = require("../errors");
var test = Manager_1.default.create("test-bucket");
var nested = test.create("nested-bucket");
describe("Manager", function () {
    it("returns the correct bucket with fetch", function () {
        expect(Manager_1.default.fetch("test-bucket")).toBe(test);
        expect(Manager_1.default.fetch("test-bucket.nested-bucket")).toBe(nested);
    });
    it("throws when fetching bad buckets", function () {
        expect(function () { Manager_1.default.fetch(); }).toThrow(errors_1.MissingBucketError);
        expect(function () { Manager_1.default.fetch("bad-bucket"); }).toThrow(errors_1.MissingBucketError);
        expect(function () { Manager_1.default.fetch("test-bucket.bad-bucket"); }).toThrow(errors_1.MissingBucketError);
    });
    it("correctly checks existing buckets", function () {
        expect(Manager_1.default.check("test-bucket")).toBe(true);
        expect(Manager_1.default.check("test-bucket.nested-bucket")).toBe(true);
    });
    it("correctly checks non-existant buckets", function () {
        expect(Manager_1.default.check("not-a-bucket")).toBe(false);
    });
    it("handles checking null-y inputs", function () {
        expect(Manager_1.default.check()).toBe(true);
        expect(Manager_1.default.check("")).toBe(true);
        expect(Manager_1.default.check(undefined)).toBe(true);
    });
    it("generates down the tables", function () {
        test.add("test string");
        expect(Manager_1.default.generate("test-bucket")).toBe("test string");
    });
    it("handles creating on non-existant buckets", function () {
        expect(function () { return Manager_1.default.create("bad-bucket.worse-bucket"); }).toThrow(errors_1.MissingBucketError);
    });
    it("handles duplicated names", function () {
        expect(function () { return Manager_1.default.create("test-bucket"); }).toThrow(errors_1.DuplicateNameError);
    });
    it("attaches fresh buckets properly", function () {
        var bucket = new bucket_1.default("attached-bucket");
        Manager_1.default.attach(bucket);
        expect(Manager_1.default.fetch("attached-bucket")).toBe(bucket);
    });
    it("detaches buckets properly", function () {
        var bucket = Manager_1.default.create("detach-bucket");
        Manager_1.default.detach(bucket);
        expect(function () { return Manager_1.default.fetch("detach-bucket"); }).toThrow(errors_1.MissingBucketError);
    });
    it("attach doesn't double attach", function () {
        var bucket = new bucket_1.default("double-attach");
        Manager_1.default.attach(bucket);
        expect(function () { return Manager_1.default.attach(bucket); }).toThrow(errors_1.DuplicateNameError);
    });
});
