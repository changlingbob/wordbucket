"use strict";
exports.__esModule = true;
var BucketSerializer_1 = require("./BucketSerializer");
var Errors_1 = require("./Errors");
var WordEntry_1 = require("./WordEntry");
var WordEntry_2 = require("./WordEntry");
exports.WordEntry = WordEntry_2["default"];
var Errors_2 = require("./Errors");
exports.DuplicateNameError = Errors_2.DuplicateNameError;
var Bucket = /** @class */ (function () {
    function Bucket(name, parent) {
        this.weight = 0;
        this.children = {};
        this.wordList = [];
        if (!Bucket.root) {
            if (name === undefined) {
                Bucket.root = this;
                this.id = "";
                this.parent = null;
                return;
            }
            else {
                new Bucket();
            }
        }
        if (!name) {
            throw new Error("Buckets must have a name");
        }
        var oldBucket;
        if (parent && parent !== Bucket.root) {
            oldBucket = Bucket.root.findBucket(parent.getName() + "." + name);
        }
        else {
            oldBucket = Bucket.root.findBucket(name);
        }
        if (oldBucket) {
            throw new Errors_1.DuplicateNameError("A bucket with the name '" + name + "' already exists", oldBucket);
        }
        if (!(name instanceof Array)) {
            name = name.split(".");
        }
        this.id = name.slice(-1)[0];
        var realParent = Bucket.root;
        if (name.length > 1) {
            var foundParent = Bucket.root.findBucket(name.slice(0, -1));
            if (foundParent && parent && foundParent !== parent) {
                throw new Error("Supplied parent doesn't match namespaced parent");
            }
            else if (foundParent) {
                realParent = foundParent;
            }
            else if (parent) {
                realParent = parent;
            }
            else {
                realParent = new Bucket(name.slice(0, -1));
            }
        }
        else if (parent instanceof Bucket) {
            realParent = parent;
        }
        realParent.children[this.id] = this;
        this.parent = realParent;
    }
    Bucket.generate = function (identifier) { return Bucket.root.generate(identifier); };
    Bucket.serialize = function (name) {
        if (name) {
            var bucket = Bucket.get(name);
            if (bucket) {
                return JSON.stringify(bucket.serialize());
            }
            else {
                throw new Error("Could not find bucket named " + name);
            }
        }
        else {
            return JSON.stringify(Bucket.root.serialize());
        }
    };
    Bucket.get = function (name) {
        return Bucket.root.findBucket(name);
    };
    Bucket.deserialize = function (data, parent) {
        var bucket = Bucket.root;
        if (data.name.length > 0) {
            try {
                bucket = new Bucket(data.name, parent);
            }
            catch (e) {
                if (e instanceof Errors_1.DuplicateNameError) {
                    bucket = e.duplicate;
                }
                else {
                    throw e;
                }
            }
        }
        for (var _i = 0, _a = data.children; _i < _a.length; _i++) {
            var child = _a[_i];
            this.deserialize(child, bucket);
        }
        for (var _b = 0, _c = data.words; _b < _c.length; _b++) {
            var words = _c[_b];
            bucket.putWords(words.words, words.weight);
        }
        return bucket;
    };
    Bucket.prototype.findBucket = function (name) {
        if (!!name) {
            if (!(name instanceof Array)) {
                name = name.split(".");
            }
            var target = this.children[name[0]];
            if (target) {
                if (name.length > 1) {
                    return target.findBucket(name.slice(1));
                }
                else {
                    return target;
                }
            }
        }
        return undefined;
    };
    Bucket.prototype.getName = function () {
        if (!this.parent) {
            return "";
        }
        else {
            return "" + this.parent.getName() + (this.parent !== Bucket.root ? "." : "") + this.id;
        }
    };
    Bucket.prototype.generate = function (identifier) {
        var bucket = Bucket.root.findBucket(identifier);
        if (bucket) {
            return bucket.generate();
        }
        else {
            return this.rollWords();
        }
    };
    Bucket.prototype.addChild = function (child) {
        if (child instanceof Bucket) {
            this.children[child.id] = child;
        }
        else {
            new Bucket(child, this);
        }
    };
    Bucket.prototype.removeChild = function (child) {
        var childId = "";
        if (child instanceof Bucket) {
            childId = child.id;
        }
        else {
            childId = child;
        }
        if (childId) {
            if (childId.indexOf(".") > -1) {
                childId = childId.split(this.id + ".")[1];
            }
            delete this.children[childId];
        }
    };
    Bucket.prototype.getChildren = function () {
        var children = [];
        for (var _i = 0, _a = Object.keys(this.children); _i < _a.length; _i++) {
            var child = _a[_i];
            children.push(this.children[child]);
        }
        return children;
    };
    Bucket.prototype.putWords = function (words, weight) {
        if (words instanceof WordEntry_1["default"]) {
            this.wordList.push(words);
            this.weight += words.weight;
        }
        else {
            this.wordList.push(new WordEntry_1["default"](words, weight || 1, this));
            this.weight += weight || 1;
        }
    };
    Bucket.prototype.getWords = function () {
        return this.wordList;
    };
    Bucket.prototype.removeWords = function (_a) {
        var id = _a.id, word = _a.word;
        if (word && id === undefined) {
            id = this.wordList.indexOf(word);
        }
        if (id !== undefined && id > -1) {
            this.weight -= this.wordList[id].weight;
            this.wordList.splice(id, 1);
        }
    };
    Bucket.prototype.toCSV = function () {
        return BucketSerializer_1.toCSV(this);
    };
    Bucket.prototype.rollWords = function () {
        var dieSize = this.weight * 10;
        var target = Math.floor(Math.random() * dieSize + 1);
        var weightAccumulator = 0;
        var words;
        for (var _i = 0, _a = this.wordList; _i < _a.length; _i++) {
            words = _a[_i];
            weightAccumulator += words.weight * 10;
            if (weightAccumulator > target) {
                break;
            }
        }
        if (words) {
            return words.generate();
        }
        else {
            return "miss!";
        }
    };
    Bucket.prototype.serialize = function () {
        var output = {
            children: [],
            name: this.id,
            words: []
        };
        for (var _i = 0, _a = Object.keys(this.children); _i < _a.length; _i++) {
            var child = _a[_i];
            output.children.push(this.children[child].serialize());
        }
        for (var _b = 0, _c = this.wordList; _b < _c.length; _b++) {
            var words = _c[_b];
            output.words.push(words.serialize());
        }
        return output;
    };
    Bucket.load = BucketSerializer_1.load;
    Bucket.fromCSV = BucketSerializer_1.fromCSV;
    return Bucket;
}());
exports["default"] = Bucket;
