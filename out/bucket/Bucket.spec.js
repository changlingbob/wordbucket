"use strict";
exports.__esModule = true;
var rng_1 = require("../rng");
var word_1 = require("../word");
var Bucket_1 = require("./Bucket");
describe('Bucket', function () {
    it('has a title', function () {
        expect(new Bucket_1.Bucket('title').title).toBe('title');
    });
    it('generate does a roll', function () {
        var test = new Bucket_1.Bucket();
        test.add('test string');
        expect(test.generate()).toBe('test string');
    });
    it('probably respects weighting of words', function () {
        var test = new Bucket_1.Bucket();
        test.add('common string', 9);
        test.add('rare string', 1);
        var testArray = [];
        for (var iii = 0; iii < 1000; iii++) {
            testArray.push(test.generate());
        }
        expect(testArray.filter(function (s) { return s === 'rare string'; }).length).toBeLessThan(200);
    });
    it('respects seeded inputs', function () {
        rng_1.RNG.fix(true);
        var test = new Bucket_1.Bucket();
        test.add('1', 1);
        test.add('2', 1);
        test.add('3', 1);
        test.add('4', 1);
        test.add('5', 1);
        test.add('6', 1);
        test.add('7', 1);
        test.add('8', 1);
        test.add('9', 1);
        test.add('10', 1);
        expect(test.generate({ seed: 'test-1' })).toEqual(test.generate({ seed: 'test-1' }));
        expect(test.generate({ seed: 'test-2' })).toEqual(test.generate({ seed: 'test-2' }));
        expect(test.generate({ seed: 'test-3' })).toEqual(test.generate({ seed: 'test-3' }));
        expect(test.generate({ seed: 'test-4' })).toEqual(test.generate({ seed: 'test-4' }));
        expect(test.generate({ seed: 'test-5' })).toEqual(test.generate({ seed: 'test-5' }));
    });
    it("returns words when they're created", function () {
        expect(JSON.stringify(new Bucket_1.Bucket().add('test'))).toBe(JSON.stringify(new word_1.Word('test')));
    });
    it('can remove unwanted words', function () {
        var bucket = new Bucket_1.Bucket();
        var word = bucket.add('test');
        bucket.remove(word);
        expect(bucket.getWords().indexOf(word)).toBe(-1);
    });
    it("remove doesn't explode", function () {
        var bucket = new Bucket_1.Bucket();
        var word = new word_1.Word('test');
        expect(bucket.remove(word));
    });
    it("doesn't throw with no words", function () {
        expect(new Bucket_1.Bucket().generate()).toBe('');
    });
});
//# sourceMappingURL=Bucket.spec.js.map