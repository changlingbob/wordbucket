"use strict";
exports.__esModule = true;
exports.CONST = void 0;
var RESERVED_WORDS = ['upper'];
var BRACE_PAIRS = {
    '{': ['{', '}'],
    '}': ['{', '}'],
    '[': ['[', ']'],
    ']': ['[', ']'],
    '(': ['(', ')'],
    ')': ['(', ')'],
    '<': ['<', '>'],
    '>': ['<', '>']
};
var BAD_COMMANDS = /\{\}\[\]\(\)<>[a-zA-Z0-9]/;
exports.CONST = {
    BAD_COMMANDS: BAD_COMMANDS,
    BRACE_PAIRS: BRACE_PAIRS,
    RESERVED_WORDS: RESERVED_WORDS
};
//# sourceMappingURL=constants.js.map