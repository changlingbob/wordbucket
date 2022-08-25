import { Bucket } from '../bucket';
import { DuplicateNameError, MissingBucketError, ReservedWordError, } from '../errors';
import { WordManager } from './Manager';
var test = WordManager.create('test-bucket');
var nested = WordManager.create('test-bucket.nested-bucket');
describe('WordManager', function () {
    it('returns the correct bucket with fetch', function () {
        expect(WordManager.fetch('test-bucket')).toBe(test);
        expect(WordManager.fetch('test-bucket.nested-bucket')).toBe(nested);
    });
    it('throws when fetching bad buckets', function () {
        expect(function () {
            WordManager.fetch();
        }).toThrow(MissingBucketError);
        expect(function () {
            WordManager.fetch('bad-bucket');
        }).toThrow(MissingBucketError);
        expect(function () {
            WordManager.fetch('test-bucket.bad-bucket');
        }).toThrow(MissingBucketError);
    });
    it('correctly checks existing buckets', function () {
        expect(WordManager.check('test-bucket')).toBe(true);
        expect(WordManager.check('test-bucket.nested-bucket')).toBe(true);
    });
    it('correctly checks non-existant buckets', function () {
        expect(WordManager.check('not-a-bucket')).toBe(false);
    });
    it('handles checking null-y inputs', function () {
        expect(WordManager.check()).toBe(true);
        expect(WordManager.check('')).toBe(true);
        expect(WordManager.check(undefined)).toBe(true);
    });
    it('generates down the tables', function () {
        test.add('test string');
        expect(WordManager.generate('test-bucket')).toBe('test string');
    });
    it('handles duplicated names', function () {
        expect(function () { return WordManager.create('test-bucket'); }).toThrow(DuplicateNameError);
    });
    it('handles command clashes', function () {
        expect(function () { return WordManager.create('$test'); }).toThrow(ReservedWordError);
    });
    it('handles reserved names', function () {
        expect(function () { return WordManager.create('$a'); }).toThrow(ReservedWordError);
        expect(function () { return WordManager.create('£a'); }).toThrow(ReservedWordError);
    });
    it('attaches fresh buckets properly', function () {
        var bucket = new Bucket('attached-bucket');
        WordManager.attach(bucket);
        expect(WordManager.fetch('attached-bucket')).toBe(bucket);
    });
    it('detaches buckets properly', function () {
        var bucket = WordManager.create('detach-bucket');
        bucket.add('test');
        WordManager.detach(bucket);
        expect(function () { return WordManager.fetch('detach-bucket'); }).toThrow(MissingBucketError);
    });
    it('removes buckets properly', function () {
        var bucket = WordManager.create('remove-bucket');
        bucket.add('test');
        WordManager.remove('remove-bucket');
        expect(function () { return WordManager.fetch('remove-bucket'); }).toThrow(MissingBucketError);
    });
    it("attach doesn't double attach", function () {
        var bucket = new Bucket('double-attach');
        WordManager.attach(bucket);
        expect(function () { return WordManager.attach(bucket); }).toThrow(DuplicateNameError);
    });
});
//# sourceMappingURL=Manager.spec.js.map