"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = __importStar(require("../manager"));
var utils_1 = require("../utils");
var Word = /** @class */ (function () {
    function Word(words, weight) {
        var _this = this;
        if (weight === void 0) { weight = 1; }
        this.generate = function () {
            var tokens = utils_1.splitString(_this.words);
            for (var token in tokens) {
                if (tokens[token][0] === manager_1.VARS.COMMAND
                    && tokens[token][1] === manager_1.VARS.BRACE[0]
                    && tokens[token].slice(-1) === manager_1.VARS.BRACE[1]) {
                    var output = void 0;
                    try {
                        output = manager_1.default.generate(tokens[token].slice(2, -1));
                    }
                    catch (e) {
                        console.log("swallowing error");
                        output = "!!! " + e.message + " !!!";
                    }
                    tokens[token] = output;
                }
            }
            return tokens.join(" ").trim();
        };
        this.update = function (update) {
            var words = update.words, weight = update.weight;
            if (words) {
                _this.words = words;
            }
            if (weight) {
                _this.weight = weight;
            }
        };
        this.words = words;
        this.weight = weight;
    }
    return Word;
}());
exports.default = Word;
