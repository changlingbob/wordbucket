declare module "BucketSerializer" {
    import Bucket from "Bucket";
    export interface ISerializedBucket {
        name: string;
        children: ISerializedBucket[];
        words: ISerializedWordEntry[];
    }
    export interface ISerializedWordEntry {
        words: string;
        weight: number;
    }
    export function load(data: string, parent?: Bucket): void;
    export function serialize(): string;
    export function fromCSV(data: string): void;
    export function toCSV(data: Bucket): string;
}
declare module "WordEntry" {
    import Bucket from "Bucket";
    import { ISerializedWordEntry } from "BucketSerializer";
    export default class WordEntry {
        weight: number;
        words: string;
        private parent;
        constructor(words: string, weight?: number, bucket?: Bucket);
        update({ words, weight }: {
            words?: string;
            weight?: number;
        }): void;
        generate(): string;
        serialize(): ISerializedWordEntry;
        private addAOrAn;
        private runCommand;
        private partialGenerator;
    }
}
declare module "Bucket" {
    import { fromCSV, ISerializedBucket, load } from "BucketSerializer";
    import WordEntry from "WordEntry";
    export { default as WordEntry } from "WordEntry";
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
}
