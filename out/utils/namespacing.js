"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitPath = function (path) {
    return path.split(".");
};
exports.pathEnding = function (path) {
    return exports.splitPath(path)[exports.splitPath(path).length - 1];
};
exports.getParentFromPath = function (path) {
    return exports.splitPath(path).slice(0, -1).join(".");
};
exports.pathToTuple = function (path) {
    return {
        parent: exports.splitPath(path)[0],
        child: path.split(exports.splitPath(path)[0] + ".")[1]
    };
};
exports.tupleToPath = function (tuple) {
    return tuple.join(".");
};
