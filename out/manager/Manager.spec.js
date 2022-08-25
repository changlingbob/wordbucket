"use strict";
exports.__esModule = true;
var bucket_1 = require("../bucket");
var errors_1 = require("../errors");
var Manager_1 = require("./Manager");
var test = Manager_1.WordManager.create('test-bucket');
var nested = Manager_1.WordManager.create('test-bucket.nested-bucket');
describe('WordManager', function () {
    it('returns the correct bucket with fetch', function () {
        expect(Manager_1.WordManager.fetch('test-bucket')).toBe(test);
        expect(Manager_1.WordManager.fetch('test-bucket.nested-bucket')).toBe(nested);
    });
    it('throws when fetching bad buckets', function () {
        expect(function () {
            Manager_1.WordManager.fetch();
        }).toThrow(errors_1.MissingBucketError);
        expect(function () {
            Manager_1.WordManager.fetch('bad-bucket');
        }).toThrow(errors_1.MissingBucketError);
        expect(function () {
            Manager_1.WordManager.fetch('test-bucket.bad-bucket');
        }).toThrow(errors_1.MissingBucketError);
    });
    it('correctly checks existing buckets', function () {
        expect(Manager_1.WordManager.check('test-bucket')).toBe(true);
        expect(Manager_1.WordManager.check('test-bucket.nested-bucket')).toBe(true);
    });
    it('correctly checks non-existant buckets', function () {
        expect(Manager_1.WordManager.check('not-a-bucket')).toBe(false);
    });
    it('handles checking null-y inputs', function () {
        expect(Manager_1.WordManager.check()).toBe(true);
        expect(Manager_1.WordManager.check('')).toBe(true);
        expect(Manager_1.WordManager.check(undefined)).toBe(true);
    });
    it('generates down the tables', function () {
        test.add('test string');
        expect(Manager_1.WordManager.generate('test-bucket')).toBe('test string');
    });
    it('handles duplicated names', function () {
        expect(function () { return Manager_1.WordManager.create('test-bucket'); }).toThrow(errors_1.DuplicateNameError);
    });
    it('handles command clashes', function () {
        expect(function () { return Manager_1.WordManager.create('$test'); }).toThrow(errors_1.ReservedWordError);
    });
    it('handles reserved names', function () {
        expect(function () { return Manager_1.WordManager.create('$a'); }).toThrow(errors_1.ReservedWordError);
        expect(function () { return Manager_1.WordManager.create('£a'); }).toThrow(errors_1.ReservedWordError);
    });
    it('attaches fresh buckets properly', function () {
        var bucket = new bucket_1.Bucket('attached-bucket');
        Manager_1.WordManager.attach(bucket);
        expect(Manager_1.WordManager.fetch('attached-bucket')).toBe(bucket);
    });
    it('detaches buckets properly', function () {
        var bucket = Manager_1.WordManager.create('detach-bucket');
        bucket.add('test');
        Manager_1.WordManager.detach(bucket);
        expect(function () { return Manager_1.WordManager.fetch('detach-bucket'); }).toThrow(errors_1.MissingBucketError);
    });
    it('removes buckets properly', function () {
        var bucket = Manager_1.WordManager.create('remove-bucket');
        bucket.add('test');
        Manager_1.WordManager.remove('remove-bucket');
        expect(function () { return Manager_1.WordManager.fetch('remove-bucket'); }).toThrow(errors_1.MissingBucketError);
    });
    it("attach doesn't double attach", function () {
        var bucket = new bucket_1.Bucket('double-attach');
        Manager_1.WordManager.attach(bucket);
        expect(function () { return Manager_1.WordManager.attach(bucket); }).toThrow(errors_1.DuplicateNameError);
    });
});
//# sourceMappingURL=Manager.spec.js.map