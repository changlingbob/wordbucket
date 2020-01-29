import { fromCSV, ISerializedBucket, load } from "./BucketSerializer";
import WordEntry from "./WordEntry";
export { default as WordEntry } from "./WordEntry";
export { DuplicateNameError as DuplicateNameError } from "./Errors";
export default class Bucket {
    static load: typeof load;
    static fromCSV: typeof fromCSV;
    static generate(identifier?: string | string[]): string;
    static serialize(name?: string): string;
    static get(name: string): Bucket;
    static deserialize(data: ISerializedBucket, parent?: Bucket): Bucket;
    private static root;
    id: string;
    weight: number;
    private children;
    private parent;
    private wordList;
    constructor(name?: string | string[], parent?: Bucket);
    findBucket(name?: string | string[]): Bucket | undefined;
    getName(): string;
    generate(identifier?: string | string[]): string;
    addChild(child: Bucket | string): void;
    removeChild(child: Bucket | string): void;
    getChildren(): Bucket[];
    putWords(words: WordEntry | string, weight?: number): void;
    getWords(): WordEntry[];
    removeWords({ id, word }: {
        id?: number;
        word?: WordEntry;
    }): void;
    toCSV(): string;
    private rollWords;
    private serialize;
}
