"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordSummer = function (words) {
    return words.reduce(function (sum, word) { return sum + word.weight; }, 0);
};
