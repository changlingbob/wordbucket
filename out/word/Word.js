"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = __importDefault(require("../manager"));
var utils_1 = require("../utils");
var errors_1 = require("../errors");
var Word = /** @class */ (function () {
    function Word(words, weight) {
        var _this = this;
        if (weight === void 0) { weight = 1; }
        this.generate = function () {
            var _a;
            var tokens = utils_1.splitString(_this.words);
            var _loop_1 = function (token) {
                if (utils_1.checkFullToken(tokens[token])) {
                    var fragments = [];
                    var subTokens = tokens[token].slice(2, -1).split(/, ?/);
                    var aOrAn = "";
                    for (var _i = 0, subTokens_1 = subTokens; _i < subTokens_1.length; _i++) {
                        var subToken = subTokens_1[_i];
                        if (utils_1.checkSubToken(subToken)) {
                            // set flags for special cases here;
                            switch (subToken.slice(1)) {
                                case "a":
                                case "an":
                                    aOrAn = subToken.slice(1);
                                    break;
                            }
                        }
                        else {
                            try {
                                var word = manager_1.default.generate(subToken);
                                if (word.length > 0) {
                                    fragments.push(word);
                                }
                            }
                            catch (e) {
                                // Jest gets this type wrong, so it isn't tested.
                                if (typeof e === typeof errors_1.MissingBucketError) {
                                    // tslint:disable-next-line: no-console
                                    console.error("Swallowing error:");
                                    // tslint:disable-next-line: no-console
                                    console.error(e);
                                    fragments.push("!!! " + e.message + " in " + e.bucket + " !!!");
                                }
                                else {
                                    throw e;
                                }
                            }
                        }
                    }
                    var outputPrepend = function (fragment) {
                        if (output_1.length > 0) {
                            output_1 = fragment + " " + output_1;
                        }
                        else {
                            output_1 = fragment;
                        }
                    };
                    var output_1 = fragments.join(", ");
                    if (aOrAn.length > 0) {
                        var vowelArray = ["a", "e", "i", "o", "u", "1", "8"];
                        var firstChar = (_a = output_1.match(/[a-zA-Z0-9]/)) === null || _a === void 0 ? void 0 : _a.pop();
                        if (firstChar && vowelArray.indexOf(firstChar) > -1) {
                            outputPrepend("an");
                        }
                        else if (firstChar) {
                            outputPrepend("a");
                        }
                        else {
                            outputPrepend(aOrAn);
                        }
                    }
                    tokens[token] = output_1;
                }
            };
            for (var token in tokens) {
                _loop_1(token);
            }
            return tokens.join(" ").trim();
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
exports.default = Word;
