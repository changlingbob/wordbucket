export declare const splitPath: (path: string) => string[];
export declare const pathEnding: (path: string) => string;
export declare const getParentFromPath: (path: string) => string;
export declare const pathToTuple: (path: string) => {
    parent: string;
    child: string;
};
export declare const tupleToPath: (tuple: string[]) => string;
