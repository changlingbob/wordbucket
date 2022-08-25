import { Word } from '../word';
import { Bucket } from './Bucket';
describe('Bucket', function () {
    it('has a title', function () {
        expect(new Bucket('title').title).toBe('title');
    });
    it('generate does a roll', function () {
        var test = new Bucket();
        test.add('test string');
        expect(test.generate()).toBe('test string');
    });
    it('probably respects weighting of words', function () {
        var test = new Bucket();
        test.add('common string', 9);
        test.add('rare string', 1);
        var testArray = [];
        for (var iii = 0; iii < 1000; iii++) {
            testArray.push(test.generate());
        }
        expect(testArray.filter(function (s) { return s === 'rare string'; }).length).toBeLessThan(200);
    });
    it("returns words when they're created", function () {
        expect(JSON.stringify(new Bucket().add('test'))).toBe(JSON.stringify(new Word('test')));
    });
    it('can remove unwanted words', function () {
        var bucket = new Bucket();
        var word = bucket.add('test');
        bucket.remove(word);
        expect(bucket.getWords().indexOf(word)).toBe(-1);
    });
    it("remove doesn't explode", function () {
        var bucket = new Bucket();
        var word = new Word('test');
        expect(bucket.remove(word));
    });
    it("doesn't throw with no words", function () {
        expect(new Bucket().generate()).toBe('');
    });
});
//# sourceMappingURL=Bucket.spec.js.map