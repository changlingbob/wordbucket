"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bucket_1 = __importDefault(require("../bucket"));
var errors_1 = require("../errors");
var utils_1 = require("../utils");
var buckets = {};
var check = function (title) {
    if (title === void 0) { title = ""; }
    if (title.length === 0) {
        return true;
    }
    var _a = utils_1.pathToTuple(title), parent = _a.parent, child = _a.child;
    if (buckets[parent] === undefined) {
        return false;
    }
    return buckets[parent].check(child);
};
var fetch = function (title) {
    if (title === void 0) { title = ""; }
    if (title.length > 0) {
        var _a = utils_1.pathToTuple(title), parent = _a.parent, child = _a.child;
        if (buckets[parent] !== undefined) {
            return buckets[parent].fetch(child);
        }
    }
    throw new errors_1.MissingBucketError("Can't find bucket named " + title, title);
};
var create = function (title) {
    if (check(title)) {
        throw new errors_1.DuplicateNameError("A bucket with the name '" + title + "' already exists", fetch(title));
    }
    if (!!!check(utils_1.getParentFromPath(title))) {
        throw new errors_1.MissingBucketError("The parent of the bucket " + title + " does not exist yet!", title);
    }
    var bucket = new bucket_1.default(title);
    buckets[title] = bucket;
    return bucket;
};
var attach = function (bucket) {
    if (buckets[bucket.title]) {
        throw new errors_1.DuplicateNameError("Tried to attach " + bucket.title + " to the root, but one already exists", bucket);
    }
    buckets[bucket.title] = bucket;
};
var detach = function (bucket) {
    delete buckets[bucket.title];
};
var generate = function (title) {
    return fetch(title).generate();
};
var serialise = function (spacing) {
    if (spacing === void 0) { spacing = 0; }
    return JSON.stringify(buckets, null, spacing);
};
var decompress = function (input, bucket) {
    for (var _i = 0, _a = Object.keys(input); _i < _a.length; _i++) {
        var title = _a[_i];
        var child = input[title];
        if (bucket.check(title)) {
            for (var _b = 0, _c = child.words; _b < _c.length; _b++) {
                var word = _c[_b];
                bucket.fetch(title).add(word.words, word.weight);
            }
        }
        else {
            bucket.create(title);
        }
        if (child.children) {
            decompress(child.children, bucket.fetch(title));
        }
    }
};
var deserialise = function (input) {
    var title;
    try {
        var obj = JSON.parse(input);
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            title = _a[_i];
            var bucket = obj[title];
            if (check(title)) {
                for (var _b = 0, _c = bucket.words; _b < _c.length; _b++) {
                    var word = _c[_b];
                    fetch(title).add(word.words, word.weight);
                }
            }
            else {
                create(title);
            }
            if (bucket.children) {
                decompress(bucket.children, fetch(title));
            }
        }
    }
    catch (e) {
        throw new errors_1.DeserialiseBucketError("Couldn't parse bucket " + title, e);
    }
    console.log(serialise(2));
};
var getBuckets = function () {
    return Object.values(buckets);
};
exports.default = {
    attach: attach,
    check: check,
    create: create,
    deserialise: deserialise,
    detach: detach,
    fetch: fetch,
    generate: generate,
    serialise: serialise,
};
