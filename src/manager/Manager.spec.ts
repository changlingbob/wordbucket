import { Bucket } from '../bucket';
import {
  DuplicateNameError,
  MissingBucketError,
  ReservedWordError,
} from '../errors';
import { WordManager } from './Manager';

const test = WordManager.create('test-bucket');
const nested = WordManager.create('test-bucket.nested-bucket');

describe('WordManager', () => {
  it('returns the correct bucket with fetch', () => {
    expect(WordManager.fetch('test-bucket')).toBe(test);
    expect(WordManager.fetch('test-bucket.nested-bucket')).toBe(nested);
  });

  it('throws when fetching bad buckets', () => {
    expect(() => {
      WordManager.fetch();
    }).toThrow(MissingBucketError);
    expect(() => {
      WordManager.fetch('bad-bucket');
    }).toThrow(MissingBucketError);
    expect(() => {
      WordManager.fetch('test-bucket.bad-bucket');
    }).toThrow(MissingBucketError);
  });

  it('correctly checks existing buckets', () => {
    expect(WordManager.check('test-bucket')).toBe(true);
    expect(WordManager.check('test-bucket.nested-bucket')).toBe(true);
  });

  it('correctly checks non-existant buckets', () => {
    expect(WordManager.check('not-a-bucket')).toBe(false);
  });

  it('handles checking null-y inputs', () => {
    expect(WordManager.check()).toBe(true);
    expect(WordManager.check('')).toBe(true);
    expect(WordManager.check(undefined)).toBe(true);
  });

  it('generates down the tables', () => {
    test.add('test string');

    expect(WordManager.generate('test-bucket')).toBe('test string');
  });

  it('handles duplicated names', () => {
    expect(() => WordManager.create('test-bucket')).toThrow(DuplicateNameError);
  });

  it('handles command clashes', () => {
    expect(() => WordManager.create('$test')).toThrow(ReservedWordError);
  });

  it('handles reserved names', () => {
    expect(() => WordManager.create('$a')).toThrow(ReservedWordError);
    expect(() => WordManager.create('£a')).toThrow(ReservedWordError);
  });

  it('attaches fresh buckets properly', () => {
    const bucket = new Bucket('attached-bucket');
    WordManager.attach(bucket);
    expect(WordManager.fetch('attached-bucket')).toBe(bucket);
  });

  it('detaches buckets properly', () => {
    const bucket = WordManager.create('detach-bucket');
    bucket.add('test');
    WordManager.detach(bucket);
    expect(() => WordManager.fetch('detach-bucket')).toThrow(
      MissingBucketError
    );
  });

  it('removes buckets properly', () => {
    const bucket = WordManager.create('remove-bucket');
    bucket.add('test');
    WordManager.remove('remove-bucket');
    expect(() => WordManager.fetch('remove-bucket')).toThrow(
      MissingBucketError
    );
  });

  it("attach doesn't double attach", () => {
    const bucket = new Bucket('double-attach');
    WordManager.attach(bucket);
    expect(() => WordManager.attach(bucket)).toThrow(DuplicateNameError);
  });
});
