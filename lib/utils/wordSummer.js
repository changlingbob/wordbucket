"use strict";
exports.__esModule = true;
exports.wordSummer = void 0;
var wordSummer = function (words) {
    return words.reduce(function (sum, word) { return sum + word.weight; }, 0);
};
exports.wordSummer = wordSummer;
//# sourceMappingURL=wordSummer.js.map