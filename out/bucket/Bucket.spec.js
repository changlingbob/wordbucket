"use strict";
exports.__esModule = true;
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