"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var word_1 = __importDefault(require("../word"));
var utils_1 = require("../utils");
var errors_1 = require("../errors");
var Bucket = /** @class */ (function () {
    function Bucket(title) {
        var _this = this;
        if (title === void 0) { title = "__MISSING__"; }
        this.create = function (title) {
            var bucket = new Bucket(title);
            _this.children[title] = bucket;
            return bucket;
        };
        this.attach = function (bucket) {
            if (_this.children[bucket.title]) {
                throw new errors_1.DuplicateNameError("Tried to attach " + bucket.title + " to " + _this.title + ", but one already exists", _this);
            }
            _this.children[bucket.title] = bucket;
        };
        this.detach = function (bucket) {
            delete _this.children[bucket.title];
        };
        this.add = function (word, weight) {
            if (weight === void 0) { weight = 1; }
            var words = _this.words.find(function (currentWord) { return currentWord.words === word; });
            if (words !== undefined) {
                words.weight = weight;
            }
            else {
                words = new word_1.default(word, weight);
                _this.words.push(words);
            }
            return words;
        };
        this.remove = function (word) {
            var wordIndex = _this.words.indexOf(word);
            if (wordIndex > -1) {
                _this.words.splice(wordIndex, 1);
            }
        };
        this.getWords = function () {
            return _this.words;
        };
        this.getChildren = function () {
            return Object.values(_this.children);
        };
        this.generate = function () {
            var max = utils_1.wordSummer(_this.words) * 10;
            var accumulator = 0;
            var target = Math.floor(Math.random() * max) + 1;
            var word;
            for (var _i = 0, _a = _this.words; _i < _a.length; _i++) {
                word = _a[_i];
                accumulator += word.weight * 10;
                if (accumulator > target) {
                    break;
                }
            }
            if (word !== undefined) {
                return word.generate();
            }
            else {
                return "";
            }
        };
        this.check = function (title) {
            if (title === void 0) { title = ""; }
            if (title.length === 0) {
                return true;
            }
            var _a = utils_1.pathToTuple(title), parent = _a.parent, child = _a.child;
            if (_this.children[parent] === undefined) {
                return false;
            }
            return _this.children[parent].check(child);
        };
        this.fetch = function (title) {
            if (title === void 0) { title = ""; }
            if (title.length === 0) {
                return _this;
            }
            else {
                var _a = utils_1.pathToTuple(title), parent = _a.parent, child = _a.child;
                if (_this.children[parent] !== undefined) {
                    return _this.children[parent].fetch(child);
                }
            }
            throw new errors_1.MissingBucketError("Can't find bucket named " + title, title);
        };
        this.children = {};
        this.words = [];
        this.title = title;
    }
    return Bucket;
}());
exports.default = Bucket;
