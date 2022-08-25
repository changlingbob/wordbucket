import { Bucket } from '../bucket';
import { DeserialiseBucketError, DuplicateNameError, MissingBucketError, ReservedWordError, } from '../errors';
import { SUBTOKENS } from '../word';
import { CONST, VARS } from '.';
var buckets = {};
var check = function (title) {
    if (title === void 0) { title = ''; }
    return !title || !!buckets[title];
};
var fetch = function (title) {
    if (title === void 0) { title = ''; }
    if (buckets[title]) {
        return buckets[title];
    }
    throw new MissingBucketError("Can't find bucket named ".concat(title), title);
};
var create = function (title) {
    if (check(title)) {
        throw new DuplicateNameError("A bucket with the name '".concat(title, "' already exists"), fetch(title));
    }
    if (!title[0].match(CONST.BAD_COMMANDS) &&
        SUBTOKENS.indexOf(title.slice(1)) > -1) {
        throw new ReservedWordError("The title ".concat(title, " is too close to a reserved command word"), title);
    }
    if (title[0] === VARS.COMMAND) {
        throw new ReservedWordError("The title ".concat(title, " begins with the command character"), title);
    }
    var bucket = new Bucket(title);
    buckets[title] = bucket;
    return bucket;
};
var attach = function (bucket) {
    if (check(bucket.title)) {
        throw new DuplicateNameError("Tried to attach ".concat(bucket.title, " to the root, but one already exists"), bucket);
    }
    buckets[bucket.title] = bucket;
};
var remove = function (bucket) {
    if (check(bucket)) {
        delete buckets[bucket];
    }
};
var detach = function (bucket) {
    if (check(bucket.title)) {
        delete buckets[bucket.title];
    }
};
var generate = function (title, variables) {
    return fetch(title).generate(variables);
};
var serialise = function () {
    var bucketTitle = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        bucketTitle[_i] = arguments[_i];
    }
    if (bucketTitle.length > 0) {
        var serialObj_1 = {};
        bucketTitle.forEach(function (title) {
            if (check(title)) {
                serialObj_1[title] = fetch(title);
            }
        });
        return JSON.stringify(serialObj_1);
    }
    return JSON.stringify(buckets);
};
var decompress = function (input, bucket) {
    Object.keys(input).forEach(function (title) {
        var child = input[title];
        var newTitle = "".concat(bucket, ".").concat(title);
        if (!check(newTitle)) {
            create(newTitle);
        }
        child.words.forEach(function (word) {
            fetch(newTitle).add(word.words, word.weight);
        });
        if (child.children) {
            decompress(child.children, newTitle);
        }
    });
};
var deserialise = function (input) {
    var title = '';
    try {
        var obj_1 = JSON.parse(input);
        Object.keys(obj_1).forEach(function (dataTitle) {
            title = dataTitle;
            var bucket = obj_1[title];
            var toAdd;
            if (!check(title)) {
                toAdd = new Bucket(title);
                attach(toAdd);
            }
            else {
                toAdd = fetch(title);
            }
            bucket.words.forEach(function (word) {
                fetch(title).add(word.words, word.weight);
            });
            if (bucket.children) {
                decompress(bucket.children, title);
            }
        });
    }
    catch (e) {
        remove(title);
        throw new DeserialiseBucketError("Couldn't parse bucket ".concat(title), e);
    }
    // console.log(serialise(2));
};
var getBuckets = function () { return Object.values(buckets); };
export var WordManager = {
    attach: attach,
    check: check,
    create: create,
    deserialise: deserialise,
    detach: detach,
    fetch: fetch,
    generate: generate,
    getBuckets: getBuckets,
    remove: remove,
    serialise: serialise
};
//# sourceMappingURL=Manager.js.map