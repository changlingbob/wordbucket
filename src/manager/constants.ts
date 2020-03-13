export const RESERVED_WORDS = ["upper"];
export const BRACE_PAIRS = {
  "{": ["{", "}"],
  "}": ["{", "}"],
  "[": ["[", "]"],
  "]": ["[", "]"],
  "(": ["(", ")"],
  ")": ["(", ")"],
  "<": ["<", ">"],
  ">": ["<", ">"],
];
export const BAD_COMMANDS = /\{\}\[\]\(\)\<\>[a-zA-Z0-9]/;
