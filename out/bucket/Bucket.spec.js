import { DuplicateNameError, MissingBucketError } from '../errors';
import Word from '../word';
import Bucket from './Bucket';
describe('Bucket', () => {
    it('has a title', () => {
        expect(new Bucket('title').title).toBe('title');
    });
    it('generate does a roll', () => {
        const test = new Bucket();
        test.add('test string');
        expect(test.generate()).toBe('test string');
    });
    it('probably respects weighting of words', () => {
        const test = new Bucket();
        test.add('common string', 9);
        test.add('rare string', 1);
        const testArray = [];
        for (let iii = 0; iii < 1000; iii++) {
            testArray.push(test.generate());
        }
        expect(testArray.filter((s) => s === 'rare string').length).toBeLessThan(200);
    });
    it("returns words when they're created", () => {
        expect(JSON.stringify(new Bucket().add('test'))).toBe(JSON.stringify(new Word('test')));
    });
    it('can remove unwanted words', () => {
        const bucket = new Bucket();
        const word = bucket.add('test');
        bucket.remove(word);
        expect(bucket.getWords().indexOf(word)).toBe(-1);
    });
    it("remove doesn't explode", () => {
        const bucket = new Bucket();
        const word = new Word('test');
        expect(bucket.remove(word));
    });
    it("doesn't throw with no words", () => {
        expect(new Bucket().generate()).toBe('');
    });
    it('checks for children', () => {
        const test = new Bucket();
        test.create('test').create('test');
        expect(test.check('test')).toBe(true);
        expect(test.check('test.test')).toBe(true);
    });
    it('checks for non-existant children', () => {
        expect(new Bucket().check('test')).toBe(false);
    });
    it('fetches children', () => {
        const test = new Bucket();
        const child = test.create('child');
        const grandchild = child.create('grandchild');
        expect(test.fetch('child')).toBe(child);
        expect(test.fetch('child.grandchild')).toBe(grandchild);
    });
    it("doesn't fetch non-existant children", () => {
        expect(() => {
            new Bucket().fetch('test');
        }).toThrow(MissingBucketError);
    });
    const testBucket = new Bucket('test');
    it('attaches fresh buckets properly', () => {
        const bucket = new Bucket('attached-bucket');
        testBucket.attach(bucket);
        expect(testBucket.fetch('attached-bucket')).toBe(bucket);
    });
    it('detaches buckets properly', () => {
        const bucket = testBucket.create('detach-bucket');
        testBucket.detach(bucket);
        expect(() => testBucket.fetch('detach-bucket')).toThrow(MissingBucketError);
    });
    it("detach doesn't explode", () => {
        const bucket = new Bucket();
        expect(testBucket.detach(bucket));
    });
    it("attach doesn't double attach", () => {
        const bucket = new Bucket();
        testBucket.attach(bucket);
        expect(() => testBucket.attach(bucket)).toThrow(DuplicateNameError);
    });
});
//# sourceMappingURL=Bucket.spec.js.map