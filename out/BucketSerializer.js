"use strict";
exports.__esModule = true;
var Bucket_1 = require("./Bucket");
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
exports.load = load;
function serialize() {
    return Bucket_1["default"].serialize();
}
exports.serialize = serialize;
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
exports.fromCSV = fromCSV;
var exportBuckets;
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
exports.toCSV = toCSV;
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
