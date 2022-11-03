import { DuplicateNameError, MissingBucketError } from '../errors';
import { RNG } from '../rng';
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

  it('respects seeded inputs', () => {
    RNG.fix(true);

    const test = new Bucket();
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

    expect(test.generate({ seed: 'test-1' })).toEqual(
      test.generate({ seed: 'test-1' })
    );
    expect(test.generate({ seed: 'test-2' })).toEqual(
      test.generate({ seed: 'test-2' })
    );
    expect(test.generate({ seed: 'test-3' })).toEqual(
      test.generate({ seed: 'test-3' })
    );
    expect(test.generate({ seed: 'test-4' })).toEqual(
      test.generate({ seed: 'test-4' })
    );
    expect(test.generate({ seed: 'test-5' })).toEqual(
      test.generate({ seed: 'test-5' })
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
