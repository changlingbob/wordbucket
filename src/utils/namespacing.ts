export const splitPath = (path: string): string[] => {
  return path.split(".");
}

export const pathEnding = (path: string): string => {
  return splitPath(path)[splitPath(path).length - 1];
}

export const pathToTuple = (path: string): string[] => {
  return [
    splitPath(path)[0],
    path.split(splitPath(path)[0] + ".")[1]
  ];
}

export const tupleToPath = (tuple: string[]): string => {
  return tuple.join(".");
}