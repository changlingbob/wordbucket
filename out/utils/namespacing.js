export const splitPath = (path) => path.split('.');
export const pathEnding = (path) => splitPath(path)[splitPath(path).length - 1];
export const getParentFromPath = (path) => splitPath(path).slice(0, -1).join('.');
export const pathToTuple = (path) => ({
    parent: splitPath(path)[0],
    child: path.split(`${splitPath(path)[0]}.`)[1],
});
export const tupleToPath = (tuple) => tuple.join('.');
//# sourceMappingURL=namespacing.js.map