"use strict";
exports.__esModule = true;
var roll_parser_1 = require("roll-parser");
var Bucket_1 = require("./Bucket");
var WordEntry = /** @class */ (function () {
    function WordEntry(words, weight, bucket) {
        this.words = words;
        this.weight = weight || 1;
        this.parent = bucket;
    }
    WordEntry.prototype.update = function (_a) {
        var words = _a.words, weight = _a.weight;
        if (words !== undefined) {
            this.words = words;
        }
        if (weight !== undefined) {
            if (this.parent) {
                this.parent.weight += weight - this.weight;
            }
            this.weight = weight;
        }
    };
    WordEntry.prototype.generate = function () {
        return this.partialGenerator(this.words, "");
    };
    WordEntry.prototype.serialize = function () {
        return { words: this.words, weight: this.weight };
    };
    WordEntry.prototype.addAOrAn = function (input) {
        var vowelArray = ["a", "e", "i", "o", "u", "1", "8"];
        var out = "";
        if (input.search(/\S/) === 0) {
            out = " ";
        }
        if (vowelArray.indexOf(input[input.search(/[a-zA-Z0-9]/)]) > -1) {
            return "an" + out;
        }
        else {
            return "a" + out;
        }
    };
    WordEntry.prototype.runCommand = function (type, command) {
        if (type === "d") {
            return roll_parser_1.parseAndRoll(command);
        }
        else {
            return Bucket_1["default"].generate(command);
        }
    };
    WordEntry.prototype.partialGenerator = function (input, result) {
        var _this = this;
        var command = input.search(/[\$\&d][\{\[]/);
        if (command === -1) {
            return result.concat(input).replace(/(\s)\s+/, "$1");
        }
        else {
            var commandChar_1 = input[command];
            var groupingChar_1 = input[command + 1];
            var initial = input.slice(0, command);
            var commandEnd = input.slice(command + 2).search(/[\}\]]/) + command + 2;
            var remaining = input.slice(commandEnd + 1);
            var commandOutput = void 0;
            var commandList = input.slice(command + 2, commandEnd).split(/,\s*/);
            commandOutput = commandList.reduce(function (accumulator, currentValue) {
                var output = _this.runCommand(commandChar_1, currentValue);
                if (accumulator.length > 0 && output.length > 0) {
                    if (groupingChar_1 === "[") {
                        output = accumulator + ", " + output;
                    }
                    else {
                        output = accumulator + " " + output;
                    }
                }
                else if (accumulator.length > 0) {
                    output = accumulator;
                }
                return output;
            }, "");
            if (commandChar_1 === "&") {
                initial += this.addAOrAn(commandOutput);
            }
            return this.partialGenerator(remaining, result + initial + commandOutput);
        }
    };
    return WordEntry;
}());
exports["default"] = WordEntry;
