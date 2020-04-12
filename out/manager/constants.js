"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RESERVED_WORDS = ["upper"];
var BRACE_PAIRS = {
    "{": ["{", "}"],
    "}": ["{", "}"],
    "[": ["[", "]"],
    "]": ["[", "]"],
    "(": ["(", ")"],
    ")": ["(", ")"],
    "<": ["<", ">"],
    ">": ["<", ">"],
};
var BAD_COMMANDS = /\{\}\[\]\(\)\<\>[a-zA-Z0-9]/;
exports.default = {
    BAD_COMMANDS: BAD_COMMANDS,
    BRACE_PAIRS: BRACE_PAIRS,
    RESERVED_WORDS: RESERVED_WORDS,
};
