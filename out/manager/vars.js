var COMMAND = '$';
var BRACE = ['{', '}'];
var setCommand = function (command) {
    COMMAND = command;
};
var setBrace = function (braces) {
    BRACE = braces;
};
export var VARS = {
    BRACE: BRACE,
    COMMAND: COMMAND,
    setBrace: setBrace,
    setCommand: setCommand
};
//# sourceMappingURL=vars.js.map