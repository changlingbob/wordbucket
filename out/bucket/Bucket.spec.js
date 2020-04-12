"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Bucket_1 = __importDefault(require("./Bucket"));
var word_1 = __importDefault(require("../word"));
var errors_1 = require("../errors");
describe("Bucket", function () {
    it("has a title", function () {
        expect(new Bucket_1.default("title").title).toBe("title");
    });
    it("generate does a roll", function () {
        var test = new Bucket_1.default();
        test.add("test string");
        expect(test.generate()).toBe("test string");
    });
    it("probably respects weighting of words", function () {
        var test = new Bucket_1.default();
        test.add("common string", 9);
        test.add("rare string", 1);
        var testArray = [];
        for (var iii = 0; iii < 1000; iii++) {
            testArray.push(test.generate());
        }
        expect(testArray.filter(function (s) { return s === "rare string"; }).length).toBeLessThan(200);
    });
    it("returns words when they're created", function () {
        expect(JSON.stringify(new Bucket_1.default().add("test"))).toBe(JSON.stringify(new word_1.default("test")));
    });
    it("can remove unwanted words", function () {
        var bucket = new Bucket_1.default();
        var word = bucket.add("test");
        bucket.remove(word);
        expect(bucket.getWords().indexOf(word)).toBe(-1);
    });
    it("remove doesn't explode", function () {
        var bucket = new Bucket_1.default();
        var word = new word_1.default("test");
        expect(bucket.remove(word));
    });
    it("doesn't throw with no words", function () {
        expect(new Bucket_1.default().generate()).toBe("");
    });
    it("checks for children", function () {
        var test = new Bucket_1.default();
        test.create("test").create("test");
        expect(test.check("test")).toBe(true);
        expect(test.check("test.test")).toBe(true);
    });
    it("checks for non-existant children", function () {
        expect(new Bucket_1.default().check("test")).toBe(false);
    });
    it("fetches children", function () {
        var test = new Bucket_1.default();
        var child = test.create("child");
        var grandchild = child.create("grandchild");
        expect(test.fetch("child")).toBe(child);
        expect(test.fetch("child.grandchild")).toBe(grandchild);
    });
    it("doesn't fetch non-existant children", function () {
        expect(function () { new Bucket_1.default().fetch("test"); }).toThrow(errors_1.MissingBucketError);
    });
    var testBucket = new Bucket_1.default("test");
    it("attaches fresh buckets properly", function () {
        var bucket = new Bucket_1.default("attached-bucket");
        testBucket.attach(bucket);
        expect(testBucket.fetch("attached-bucket")).toBe(bucket);
    });
    it("detaches buckets properly", function () {
        var bucket = testBucket.create("detach-bucket");
        testBucket.detach(bucket);
        expect(function () { return testBucket.fetch("detach-bucket"); }).toThrow(errors_1.MissingBucketError);
    });
    it("detach doesn't explode", function () {
        var bucket = new Bucket_1.default();
        expect(testBucket.detach(bucket));
    });
    it("attach doesn't double attach", function () {
        var bucket = new Bucket_1.default();
        testBucket.attach(bucket);
        expect(function () { return testBucket.attach(bucket); }).toThrow(errors_1.DuplicateNameError);
    });
});
