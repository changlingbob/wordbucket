"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = require("../manager");
exports.splitString = function (input, output) {
    if (output === void 0) { output = []; }
    var _a = exports.findCommand(input), commandChar = _a.commandChar, commandEnd = _a.commandEnd;
    if (commandChar === -1) {
        output.push(input);
        return output;
    }
    output.push(input.slice(0, commandChar).trim());
    output.push(input.slice(commandChar, commandEnd).trim());
    return exports.splitString(input.slice(commandEnd).trim(), output);
};
exports.findCommand = function (input) {
    var re = new RegExp("\\" + manager_1.VARS.COMMAND + "\\" + manager_1.VARS.BRACE[0] + "[^\\" + manager_1.VARS.BRACE[1] + "]+?\\" + manager_1.VARS.BRACE[1]);
    var results = re.exec(input);
    if (results) {
        return {
            commandChar: input.indexOf(results[0]),
            commandEnd: input.indexOf(results[0]) + results[0].length,
        };
    }
    else {
        return { commandChar: -1, commandEnd: -1 };
    }
};
