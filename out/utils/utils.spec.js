import { SUBTOKENS, Word } from '../word';
import { checkFullToken, checkSubToken } from '.';
import { findCommand, splitString } from './splitter';
import { wordSummer } from './wordSummer';
var word = new Word('word', 1);
var smallWord = new Word('the', 0.1);
var bigWord = new Word('plethora', 4);
describe('wordSummer', function () {
    it('..sums weights', function () {
        expect(wordSummer([word, word, word])).toBe(3);
        expect(wordSummer([smallWord, smallWord, smallWord])).toBeCloseTo(0.3);
        expect(wordSummer([bigWord, bigWord, bigWord])).toBe(12);
        expect(wordSummer([smallWord, word, bigWord])).toBeCloseTo(5.1);
    });
});
describe('findCommand', function () {
    it('finds commands', function () {
        expect(findCommand('0123${test}').commandChar).toBe(4);
    });
    it('returns -1 on empty', function () {
        expect(findCommand('no commands here').commandChar).toBe(-1);
    });
    it('only returns the first command', function () {
        expect(findCommand('${first command}, ${second command}').commandChar).toBe(0);
    });
});
describe('splitString', function () {
    it('does a proper no-op on commandless strings', function () {
        expect(splitString('test')).toEqual(['test']);
    });
    it('breaks apart commands', function () {
        expect(splitString('test ${command} test')).toEqual([
            'test ',
            '${command}',
            ' test',
        ]);
    });
    it('handles weird spacing, punctuation, etc', function () {
        expect(splitString('lo, I spot a ${creature}; I guess he is of ${size}-ish height')).toEqual([
            'lo, I spot a ',
            '${creature}',
            '; I guess he is of ',
            '${size}',
            '-ish height',
        ]);
    });
});
describe('tokeniser', function () {
    describe('full token', function () {
        it('finds a good full token', function () {
            expect(checkFullToken('${foo}')).toBe(true);
        });
        it('rejects a malformed full token', function () {
            expect(checkFullToken('${foo')).toBe(false);
        });
        it("rejects typo'd full token", function () {
            expect(checkFullToken('${foo}1')).toBe(false);
            expect(checkFullToken('$1{foo}')).toBe(false);
            expect(checkFullToken('${foo]')).toBe(false);
        });
    });
    describe('subtokens', function () {
        it('finds all good subtokens', function () {
            SUBTOKENS.forEach(function (token) {
                expect(checkSubToken("$".concat(token))).toBe(true);
            });
        });
        it('rejects bad subtokens', function () {
            expect(checkSubToken('$bad')).toBe(false);
        });
        it('specifically rejects full tokens', function () {
            expect(checkSubToken('${a}')).toBe(false);
        });
    });
});
//# sourceMappingURL=utils.spec.js.map