import { WordManager } from './index';

describe('barrel file', () => {
  it('has well typed exports', () => {
    const hex = WordManager.create('hex');
    hex.add('test1', 1);
    hex.add('test2', 1);
    WordManager.create('hex.subtable');
    const subtable = WordManager.fetch('hex.subtable');
    subtable.add('test3', 1);
    subtable.generate();

    WordManager.generate('hex');

    expect(WordManager.serialise()).toBe(
      `{"hex":{"words":[{"words":"test1","weight":1},{"words":"test2","weight":1}],"title":"hex"},"hex.subtable":{"words":[{"words":"test3","weight":1}],"title":"hex.subtable"}}`
    );
    WordManager.detach(WordManager.fetch('hex'));
    WordManager.detach(WordManager.fetch('hex.subtable'));

    expect(
      WordManager.deserialise(
        `{"hex":{"children":{"subtable":{"children":{},"words":[{"words":"test3","weight":1}],"title":"subtable"}},"words":[{"words":"test1","weight":1},{"words":"test2","weight":1}],"title":"hex"}}`
      )
    );
    expect(WordManager.serialise()).toBe(
      `{"hex":{"words":[{"words":"test1","weight":1},{"words":"test2","weight":1}],"title":"hex"},"hex.subtable":{"words":[{"words":"test3","weight":1}],"title":"hex.subtable"}}`
    );
  });
});
