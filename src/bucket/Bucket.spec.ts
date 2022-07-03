import { DuplicateNameError, MissingBucketError } from '../errors';
import { Word } from '../word';
import { Bucket } from './Bucket';

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

    const testArray: string[] = [];
    for (let iii = 0; iii < 1000; iii++) {
      testArray.push(test.generate());
    }

    expect(testArray.filter((s) => s === 'rare string').length).toBeLessThan(
      200
    );
  });

  it("returns words when they're created", () => {
    expect(JSON.stringify(new Bucket().add('test'))).toBe(
      JSON.stringify(new Word('test'))
    );
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
});
