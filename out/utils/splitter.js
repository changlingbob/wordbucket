import { VARS } from '../manager';
export var findCommand = function (input) {
    var re = new RegExp("\\".concat(VARS.COMMAND, "\\").concat(VARS.BRACE[0], "[^\\").concat(VARS.BRACE[1], "]+?\\").concat(VARS.BRACE[1]));
    var results = re.exec(input);
    if (results) {
        return {
            commandChar: input.indexOf(results[0]),
            commandEnd: input.indexOf(results[0]) + results[0].length
        };
    }
    return { commandChar: -1, commandEnd: -1 };
};
export var splitString = function (input, output) {
    if (output === void 0) { output = []; }
    var _a = findCommand(input), commandChar = _a.commandChar, commandEnd = _a.commandEnd;
    if (commandChar === -1) {
        output.push(input);
        return output;
    }
    output.push(input.slice(0, commandChar));
    output.push(input.slice(commandChar, commandEnd));
    return splitString(input.slice(commandEnd), output);
};
//# sourceMappingURL=splitter.js.map