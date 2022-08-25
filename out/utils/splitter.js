"use strict";
exports.__esModule = true;
exports.splitString = exports.findCommand = void 0;
var manager_1 = require("../manager");
var findCommand = function (input) {
    var re = new RegExp("\\".concat(manager_1.VARS.COMMAND, "\\").concat(manager_1.VARS.BRACE[0], "[^\\").concat(manager_1.VARS.BRACE[1], "]+?\\").concat(manager_1.VARS.BRACE[1]));
    var results = re.exec(input);
    if (results) {
        return {
            commandChar: input.indexOf(results[0]),
            commandEnd: input.indexOf(results[0]) + results[0].length
        };
    }
    return { commandChar: -1, commandEnd: -1 };
};
exports.findCommand = findCommand;
var splitString = function (input, output) {
    if (output === void 0) { output = []; }
    var _a = (0, exports.findCommand)(input), commandChar = _a.commandChar, commandEnd = _a.commandEnd;
    if (commandChar === -1) {
        output.push(input);
        return output;
    }
    output.push(input.slice(0, commandChar));
    output.push(input.slice(commandChar, commandEnd));
    return (0, exports.splitString)(input.slice(commandEnd), output);
};
exports.splitString = splitString;
//# sourceMappingURL=splitter.js.map