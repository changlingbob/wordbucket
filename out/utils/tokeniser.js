"use strict";
exports.__esModule = true;
exports.checkSubToken = exports.checkFullToken = void 0;
var manager_1 = require("../manager");
var word_1 = require("../word");
var checkFullToken = function (token) {
    return token[0] === manager_1.VARS.COMMAND &&
        token[1] === manager_1.VARS.BRACE[0] &&
        token.slice(-1) === manager_1.VARS.BRACE[1];
};
exports.checkFullToken = checkFullToken;
var checkSubToken = function (token) {
    return token[0] === manager_1.VARS.COMMAND && word_1.SUBTOKENS.indexOf(token.slice(1)) > -1;
};
exports.checkSubToken = checkSubToken;
//# sourceMappingURL=tokeniser.js.map