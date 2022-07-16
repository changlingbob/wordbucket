import { SUBTOKENS, Word } from '../word';
import { checkFullToken, checkSubToken } from '.';
import { findCommand, splitString } from './splitter';
import { wordSummer } from './wordSummer';

const word = new Word('word', 1);
const smallWord = new Word('the', 0.1);
const bigWord = new Word('plethora', 4);

describe('wordSummer', () => {
  it('..sums weights', () => {
    expect(wordSummer([word, word, word])).toBe(3);
    expect(wordSummer([smallWord, smallWord, smallWord])).toBeCloseTo(0.3);
    expect(wordSummer([bigWord, bigWord, bigWord])).toBe(12);
    expect(wordSummer([smallWord, word, bigWord])).toBeCloseTo(5.1);
  });
});

describe('findCommand', () => {
  it('finds commands', () => {
    expect(findCommand('0123${test}').commandChar).toBe(4);
  });

  it('returns -1 on empty', () => {
    expect(findCommand('no commands here').commandChar).toBe(-1);
  });

  it('only returns the first command', () => {
    expect(findCommand('${first command}, ${second command}').commandChar).toBe(
      0
    );
  });
});

describe('splitString', () => {
  it('does a proper no-op on commandless strings', () => {
    expect(splitString('test')).toEqual(['test']);
  });

  it('breaks apart commands', () => {
    expect(splitString('test ${command} test')).toEqual([
      'test ',
      '${command}',
      ' test',
    ]);
  });

  it('handles weird spacing, punctuation, etc', () => {
    expect(
      splitString(
        'lo, I spot a ${creature}; I guess he is of ${size}-ish height'
      )
    ).toEqual([
      'lo, I spot a ',
      '${creature}',
      '; I guess he is of ',
      '${size}',
      '-ish height',
    ]);
  });
});

describe('tokeniser', () => {
  describe('full token', () => {
    it('finds a good full token', () => {
      expect(checkFullToken('${foo}')).toBe(true);
    });

    it('rejects a malformed full token', () => {
      expect(checkFullToken('${foo')).toBe(false);
    });

    it("rejects typo'd full token", () => {
      expect(checkFullToken('${foo}1')).toBe(false);
      expect(checkFullToken('$1{foo}')).toBe(false);
      expect(checkFullToken('${foo]')).toBe(false);
    });
  });

  describe('subtokens', () => {
    it('finds all good subtokens', () => {
      SUBTOKENS.forEach((token) => {
        expect(checkSubToken(`$${token}`)).toBe(true);
      });
    });

    it('rejects bad subtokens', () => {
      expect(checkSubToken('$bad')).toBe(false);
    });

    it('specifically rejects full tokens', () => {
      expect(checkSubToken('${a}')).toBe(false);
    });
  });
});
