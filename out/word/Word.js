"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Word = void 0;
var rng_1 = require("../rng");
var errors_1 = require("../errors");
var manager_1 = require("../manager");
var utils_1 = require("../utils");
var Word = /** @class */ (function () {
    function Word(words, weight) {
        if (weight === void 0) { weight = 1; }
        var _this = this;
        this.generate = function (variables) {
            var tokens = (0, utils_1.splitString)(_this.words);
            return tokens
                .map(function (token) {
                var _a;
                if ((0, utils_1.checkFullToken)(token)) {
                    var subTokens_1 = token.slice(2, -1).split(/,? /);
                    var aOrAn_1 = -1;
                    var setWord_1 = false;
                    var varWord_1 = -1;
                    var varTable_1 = false;
                    var title_1 = -1;
                    var fragments = subTokens_1.map(function (subToken, index) {
                        if ((0, utils_1.checkSubToken)(subToken)) {
                            // set flags for special cases here;
                            switch (subToken.slice(1)) {
                                case 'a':
                                case 'an':
                                    aOrAn_1 = index;
                                    return subToken.slice(1);
                                case 'table':
                                    varTable_1 = true;
                                // eslint-disable-next-line no-fallthrough -- explicit fallthrough
                                case 'var':
                                    if (subTokens_1.length <= index + 1) {
                                        throw new errors_1.ReadVariableError("Read variable syntax error with '".concat(token, " in ").concat(_this.words), _this.words);
                                    }
                                    varWord_1 = index;
                                    break;
                                case 'set':
                                    if (subTokens_1.length !== 3) {
                                        throw new errors_1.SetVariableError("Set variable syntax error with '".concat(token, " in ").concat(_this.words), _this.words);
                                    }
                                    setWord_1 = true;
                                    break;
                                case 'title':
                                    title_1 = index;
                                    break;
                                default:
                                    break;
                            }
                        }
                        else if (setWord_1 && index === 1) {
                            // NOP
                        }
                        else if (varWord_1 > -1 && varWord_1 === index - 1) {
                            var output_1 = variables[subToken];
                            if (!output_1 && output_1 !== '') {
                                return '!!! Missing variable !!!';
                            }
                            if (varTable_1) {
                                return manager_1.WordManager.fetch(output_1).generate();
                            }
                            return output_1;
                        }
                        else {
                            try {
                                var vars = rng_1.RNG.fixed
                                    ? __assign(__assign({}, variables), { seed: "".concat(rng_1.RNG.next(variables.seed)).concat(_this.words) }) : variables;
                                var word = manager_1.WordManager.generate(subToken, vars);
                                if (word.length > 0) {
                                    return word;
                                }
                            }
                            catch (e) {
                                if (typeof e === typeof errors_1.MissingBucketError) {
                                    // eslint-disable-next-line no-console -- error handling
                                    console.error('Swallowing error: \n', e);
                                    return "!!! ".concat(e.message, " !!!");
                                }
                                throw e;
                            }
                        }
                        return '';
                    });
                    if (setWord_1) {
                        // eslint-disable-next-line prefer-destructuring, no-param-reassign -- look, don't judge me eslint
                        variables[subTokens_1[1]] = fragments[2];
                        return '';
                    }
                    var output = fragments.filter(function (fragment) { return fragment.length > 0; });
                    if (aOrAn_1 >= 0 && output.length > aOrAn_1 + 1) {
                        var vowelArray = ['a', 'e', 'i', 'o', 'u', '1', '8'];
                        var firstChar = (_a = output[aOrAn_1 + 1].match(/[a-zA-Z0-9]/)) === null || _a === void 0 ? void 0 : _a.pop();
                        if (firstChar && vowelArray.indexOf(firstChar) > -1) {
                            output[aOrAn_1] = 'an';
                        }
                        else if (firstChar) {
                            output[aOrAn_1] = 'a';
                        }
                    }
                    if (title_1 >= 0 && output.length >= title_1 + 1) {
                        output[title_1] =
                            output[title_1][0].toUpperCase() + output[title_1].slice(1);
                    }
                    return output.join(' ');
                }
                return token;
            })
                .join('')
                .trim();
        };
        this.update = function (update) {
            var words = update.words, weight = update.weight;
            if (words !== undefined) {
                _this.words = words;
            }
            if (weight !== undefined) {
                _this.weight = weight;
            }
        };
        this.words = words;
        this.weight = weight;
    }
    return Word;
}());
exports.Word = Word;
//# sourceMappingURL=Word.js.map