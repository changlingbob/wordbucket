import { DeserialiseBucketError, MissingBucketError } from '../errors';
import { WordManager } from './Manager';
describe('deserialise', function () {
    it('basically deserialises', function () {
        expect(function () {
            return WordManager.deserialise('{"good-bucket": {"words":[{"words":"word1", "weight":1}, {"words":"word2", "weight":2}]}}');
        }).not.toThrow(DeserialiseBucketError);
        WordManager.remove('good-bucket');
    });
    it('throws on bad input', function () {
        expect(function () {
            return WordManager.deserialise('{"bad-bucket": {"sdf":[{"words":"test 1", "weight":1}, {"words":"test 2", "weight":2}]}}');
        }).toThrow(DeserialiseBucketError);
    });
    it('cleans up bad deserialisation', function () {
        try {
            WordManager.deserialise('{"bad-bucket": {"sdf":[{"words":"test 1", "weight":1}, {"words":"test 2", "weight":2}]}}');
        }
        catch (e) {
            // NOP
        }
        expect(function () { return WordManager.fetch('bad-bucket'); }).toThrow(MissingBucketError);
    });
});
describe('serialise', function () {
    it('serialises one bucket', function () {
        var test = WordManager.create('test');
        test.add('word');
        expect(WordManager.serialise('test')).toBe('{"test":{"words":[{"words":"word","weight":1}],"title":"test"}}');
    });
    it('serialises multiple buckets', function () {
        var test = WordManager.create('test-2');
        test.add('word');
        expect(WordManager.serialise('test', 'test-2')).toBe('{"test":{"words":[{"words":"word","weight":1}],"title":"test"},"test-2":{"words":[{"words":"word","weight":1}],"title":"test-2"}}');
    });
    it('serialises everything', function () {
        expect(WordManager.serialise()).toBe('{"test":{"words":[{"words":"word","weight":1}],"title":"test"},"test-2":{"words":[{"words":"word","weight":1}],"title":"test-2"}}');
    });
});
//# sourceMappingURL=Manager-serialisation.spec.js.map