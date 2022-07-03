export const splitPath = (path: string): string[] => path.split('.');

export const pathEnding = (path: string): string =>
  splitPath(path)[splitPath(path).length - 1];

export const getParentFromPath = (path: string): string =>
  splitPath(path).slice(0, -1).join('.');

export const pathToTuple = (
  path: string
): { parent: string; child: string } => ({
  parent: splitPath(path)[0],
  child: path.split(`${splitPath(path)[0]}.`)[1],
});

export const tupleToPath = (tuple: string[]): string => tuple.join('.');
