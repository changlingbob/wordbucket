"use strict";
exports.__esModule = true;
var word_1 = require("../word");
var _1 = require(".");
var splitter_1 = require("./splitter");
var wordSummer_1 = require("./wordSummer");
var word = new word_1.Word('word', 1);
var smallWord = new word_1.Word('the', 0.1);
var bigWord = new word_1.Word('plethora', 4);
describe('wordSummer', function () {
    it('..sums weights', function () {
        expect((0, wordSummer_1.wordSummer)([word, word, word])).toBe(3);
        expect((0, wordSummer_1.wordSummer)([smallWord, smallWord, smallWord])).toBeCloseTo(0.3);
        expect((0, wordSummer_1.wordSummer)([bigWord, bigWord, bigWord])).toBe(12);
        expect((0, wordSummer_1.wordSummer)([smallWord, word, bigWord])).toBeCloseTo(5.1);
    });
});
describe('findCommand', function () {
    it('finds commands', function () {
        expect((0, splitter_1.findCommand)('0123${test}').commandChar).toBe(4);
    });
    it('returns -1 on empty', function () {
        expect((0, splitter_1.findCommand)('no commands here').commandChar).toBe(-1);
    });
    it('only returns the first command', function () {
        expect((0, splitter_1.findCommand)('${first command}, ${second command}').commandChar).toBe(0);
    });
});
describe('splitString', function () {
    it('does a proper no-op on commandless strings', function () {
        expect((0, splitter_1.splitString)('test')).toEqual(['test']);
    });
    it('breaks apart commands', function () {
        expect((0, splitter_1.splitString)('test ${command} test')).toEqual([
            'test ',
            '${command}',
            ' test',
        ]);
    });
    it('handles weird spacing, punctuation, etc', function () {
        expect((0, splitter_1.splitString)('lo, I spot a ${creature}; I guess he is of ${size}-ish height')).toEqual([
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
            expect((0, _1.checkFullToken)('${foo}')).toBe(true);
        });
        it('rejects a malformed full token', function () {
            expect((0, _1.checkFullToken)('${foo')).toBe(false);
        });
        it("rejects typo'd full token", function () {
            expect((0, _1.checkFullToken)('${foo}1')).toBe(false);
            expect((0, _1.checkFullToken)('$1{foo}')).toBe(false);
            expect((0, _1.checkFullToken)('${foo]')).toBe(false);
        });
    });
    describe('subtokens', function () {
        it('finds all good subtokens', function () {
            word_1.SUBTOKENS.forEach(function (token) {
                expect((0, _1.checkSubToken)("$".concat(token))).toBe(true);
            });
        });
        it('rejects bad subtokens', function () {
            expect((0, _1.checkSubToken)('$bad')).toBe(false);
        });
        it('specifically rejects full tokens', function () {
            expect((0, _1.checkSubToken)('${a}')).toBe(false);
        });
    });
});
//# sourceMappingURL=utils.spec.js.map