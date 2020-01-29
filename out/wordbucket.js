System.register("BucketSerializer", ["Bucket"], function (exports_1, context_1) {
    "use strict";
    var Bucket_1, exportBuckets;
    var __moduleName = context_1 && context_1.id;
    function load(data, parent) {
        try {
            var input = JSON.parse(data);
            Bucket_1["default"].deserialize(input, parent);
        }
        catch (e) {
            throw new Error("Couldn't parse saved data: " + e);
        }
        return;
    }
    exports_1("load", load);
    function serialize() {
        return Bucket_1["default"].serialize();
    }
    exports_1("serialize", serialize);
    function parseCsvRow(data) {
        try {
            var result = [];
            var stringFragment = "";
            var quoteMode = false;
            for (var char = 0; char < data.length; char++) {
                if (data[char] === "\"") {
                    if (data[char + 1] === "\"") {
                        char++;
                        stringFragment += "\"";
                    }
                    else {
                        quoteMode = !quoteMode;
                    }
                }
                else if (data[char] === "," && !quoteMode) {
                    result.push(stringFragment);
                    stringFragment = "";
                }
                else {
                    stringFragment += data[char];
                }
            }
            result.push(stringFragment);
            return result;
        }
        catch (e) {
            throw new Error("Failed to parse CSV row:\n" + data + "\nException: " + e);
        }
    }
    function fromCSV(data) {
        var rows = data.split("\n");
        var cells = rows.map(parseCsvRow);
        try {
            var buckets = [];
            for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                var row = cells_1[_i];
                for (var cell = 0; cell < row.length; cell++) {
                    if (row === cells[0]) {
                        if (row[cell] !== "") {
                            buckets.push(new Bucket_1["default"](row[cell]));
                        }
                        else {
                            buckets.push(null);
                        }
                    }
                    else {
                        var bucket = buckets[cell];
                        if (bucket !== null && row[cell + 1] !== "") {
                            bucket.putWords(row[cell], +row[cell + 1]);
                            cell++;
                        }
                    }
                }
            }
        }
        catch (e) {
            throw new Error("Failed generating data from CSV.\nException: " + e);
        }
    }
    exports_1("fromCSV", fromCSV);
    function toCSV(data) {
        exportBuckets = [];
        csvHelper(data);
        var maxArray = 0;
        for (var _i = 0, exportBuckets_1 = exportBuckets; _i < exportBuckets_1.length; _i++) {
            var bucket = exportBuckets_1[_i];
            if (maxArray < bucket.words.length) {
                maxArray = bucket.words.length;
            }
        }
        var outputBuckets = exportBuckets.map(function (bucket) {
            var newBucket = { name: bucket.name, words: [], weights: [] };
            for (var iii = 0; iii < maxArray; iii++) {
                newBucket.words.push(bucket.words[iii] || "");
                newBucket.weights.push(bucket.weights[iii] || 0);
            }
            return newBucket;
        });
        var outString = "";
        for (var counter = -1; counter < maxArray; counter++) {
            for (var _a = 0, outputBuckets_1 = outputBuckets; _a < outputBuckets_1.length; _a++) {
                var bucket = outputBuckets_1[_a];
                if (counter === -1) {
                    outString += makeCsvCell(bucket.name) + ",,";
                }
                else {
                    outString += makeCsvCell(bucket.words[counter]) + "," + (bucket.weights[counter] || "") + ",";
                }
            }
            outString = outString.slice(0, -1) + "\n";
        }
        return outString;
    }
    exports_1("toCSV", toCSV);
    function makeCsvCell(cell) {
        cell = cell.replace(/"/, '""');
        if (cell.indexOf(",") > -1) {
            cell = "\"" + cell + "\"";
        }
        return cell;
    }
    function csvHelper(data) {
        var bucket = {
            name: data.getName(),
            weights: [],
            words: []
        };
        var wordList = data.getWords();
        for (var _i = 0, wordList_1 = wordList; _i < wordList_1.length; _i++) {
            var word = wordList_1[_i];
            bucket.words.push(word.words);
            bucket.weights.push(word.weight);
        }
        exportBuckets.push(bucket);
        for (var _a = 0, _b = data.getChildren(); _a < _b.length; _a++) {
            var child = _b[_a];
            csvHelper(child);
        }
    }
    return {
        setters: [
            function (Bucket_1_1) {
                Bucket_1 = Bucket_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("WordEntry", ["roll-parser", "Bucket"], function (exports_2, context_2) {
    "use strict";
    var roll_parser_1, Bucket_2, WordEntry;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (roll_parser_1_1) {
                roll_parser_1 = roll_parser_1_1;
            },
            function (Bucket_2_1) {
                Bucket_2 = Bucket_2_1;
            }
        ],
        execute: function () {
            WordEntry = /** @class */ (function () {
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
                        return Bucket_2["default"].generate(command);
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
            exports_2("default", WordEntry);
        }
    };
});
System.register("Bucket", ["BucketSerializer", "WordEntry"], function (exports_3, context_3) {
    "use strict";
    var BucketSerializer_1, WordEntry_1, Bucket;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (BucketSerializer_1_1) {
                BucketSerializer_1 = BucketSerializer_1_1;
            },
            function (WordEntry_1_1) {
                WordEntry_1 = WordEntry_1_1;
                exports_3({
                    "WordEntry": WordEntry_1_1["default"]
                });
            }
        ],
        execute: function () {
            Bucket = /** @class */ (function () {
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
                    if (parent && Bucket.root.findBucket(parent.getName() + "." + name)
                        || !parent && Bucket.root.findBucket(name)) {
                        throw new Error("A bucket with the name '" + name + "' already exists");
                    }
                    if (!(name instanceof Array)) {
                        name = name.split(".");
                    }
                    this.id = name.slice(-1)[0];
                    if (typeof parent === "string" && parent) {
                        parent = Bucket.root.findBucket(parent);
                    }
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
                    var bucket;
                    if (data.name.length > 0) {
                        bucket = new Bucket(data.name, parent);
                    }
                    else {
                        bucket = Bucket.root;
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
            exports_3("default", Bucket);
        }
    };
});
