const RESERVED_WORDS = ['upper'];
const BRACE_PAIRS = {
    '{': ['{', '}'],
    '}': ['{', '}'],
    '[': ['[', ']'],
    ']': ['[', ']'],
    '(': ['(', ')'],
    ')': ['(', ')'],
    '<': ['<', '>'],
    '>': ['<', '>'],
};
const BAD_COMMANDS = /\{\}\[\]\(\)<>[a-zA-Z0-9]/;
export const CONST = {
    BAD_COMMANDS,
    BRACE_PAIRS,
    RESERVED_WORDS,
};
//# sourceMappingURL=constants.js.map