"use strict";
exports.__esModule = true;
var errors_1 = require("../errors");
var Manager_1 = require("./Manager");
describe('deserialise', function () {
    it('basically deserialises', function () {
        expect(function () {
            return Manager_1.WordManager.deserialise('{"good-bucket": {"words":[{"words":"word1", "weight":1}, {"words":"word2", "weight":2}]}}');
        }).not.toThrow(errors_1.DeserialiseBucketError);
        Manager_1.WordManager.remove('good-bucket');
    });
    it('throws on bad input', function () {
        expect(function () {
            return Manager_1.WordManager.deserialise('{"bad-bucket": {"sdf":[{"words":"test 1", "weight":1}, {"words":"test 2", "weight":2}]}}');
        }).toThrow(errors_1.DeserialiseBucketError);
    });
    it('cleans up bad deserialisation', function () {
        try {
            Manager_1.WordManager.deserialise('{"bad-bucket": {"sdf":[{"words":"test 1", "weight":1}, {"words":"test 2", "weight":2}]}}');
        }
        catch (e) {
            // NOP
        }
        expect(function () { return Manager_1.WordManager.fetch('bad-bucket'); }).toThrow(errors_1.MissingBucketError);
    });
});
describe('serialise', function () {
    it('serialises one bucket', function () {
        var test = Manager_1.WordManager.create('test');
        test.add('word');
        expect(Manager_1.WordManager.serialise('test')).toBe('{"test":{"words":[{"words":"word","weight":1}],"title":"test"}}');
    });
    it('serialises multiple buckets', function () {
        var test = Manager_1.WordManager.create('test-2');
        test.add('word');
        expect(Manager_1.WordManager.serialise('test', 'test-2')).toBe('{"test":{"words":[{"words":"word","weight":1}],"title":"test"},"test-2":{"words":[{"words":"word","weight":1}],"title":"test-2"}}');
    });
    it('serialises everything', function () {
        expect(Manager_1.WordManager.serialise()).toBe('{"test":{"words":[{"words":"word","weight":1}],"title":"test"},"test-2":{"words":[{"words":"word","weight":1}],"title":"test-2"}}');
    });
});
//# sourceMappingURL=Manager-serialisation.spec.js.map