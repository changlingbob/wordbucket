"use strict";
exports.__esModule = true;
exports.VARS = void 0;
var COMMAND = '$';
var BRACE = ['{', '}'];
var setCommand = function (command) {
    COMMAND = command;
};
var setBrace = function (braces) {
    BRACE = braces;
};
exports.VARS = {
    BRACE: BRACE,
    COMMAND: COMMAND,
    setBrace: setBrace,
    setCommand: setCommand
};
//# sourceMappingURL=vars.js.map