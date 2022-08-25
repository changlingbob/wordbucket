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
export var CONST = {
    BAD_COMMANDS: BAD_COMMANDS,
    BRACE_PAIRS: BRACE_PAIRS,
    RESERVED_WORDS: RESERVED_WORDS
};
//# sourceMappingURL=constants.js.map