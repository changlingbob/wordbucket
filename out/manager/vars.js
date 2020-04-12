"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COMMAND = "$";
var BRACE = ["{", "}"];
var setCommand = function (command) {
    COMMAND = command;
};
var setBrace = function (braces) {
    BRACE = braces;
};
exports.default = {
    BRACE: BRACE,
    COMMAND: COMMAND,
    setBrace: setBrace,
    setCommand: setCommand,
};
