import { MissingBucketError, ReadVariableError, SetVariableError, } from '../errors';
import { WordManager } from '../manager';
import { checkFullToken, checkSubToken, splitString } from '../utils';
var Word = /** @class */ (function () {
    function Word(words, weight) {
        if (weight === void 0) { weight = 1; }
        var _this = this;
        this.generate = function (variables) {
            var tokens = splitString(_this.words);
            return tokens
                .map(function (token) {
                var _a;
                if (checkFullToken(token)) {
                    var subTokens_1 = token.slice(2, -1).split(/,? /);
                    var aOrAn_1 = -1;
                    var setWord_1 = false;
                    var varWord_1 = -1;
                    var varTable_1 = false;
                    var fragments = subTokens_1.map(function (subToken, index) {
                        if (checkSubToken(subToken)) {
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
                                        throw new ReadVariableError("Read variable syntax error with '".concat(token, " in ").concat(_this.words), _this.words);
                                    }
                                    varWord_1 = index;
                                    break;
                                case 'set':
                                    if (subTokens_1.length !== 3) {
                                        throw new SetVariableError("Set variable syntax error with '".concat(token, " in ").concat(_this.words), _this.words);
                                    }
                                    setWord_1 = true;
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
                                return WordManager.fetch(output_1).generate();
                            }
                            return output_1;
                        }
                        else {
                            try {
                                var word = WordManager.generate(subToken, variables);
                                if (word.length > 0) {
                                    return word;
                                }
                            }
                            catch (e) {
                                if (typeof e === typeof MissingBucketError) {
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
export { Word };
//# sourceMappingURL=Word.js.map