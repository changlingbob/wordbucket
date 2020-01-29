import Bucket from "./Bucket";
import { ISerializedWordEntry } from "./BucketSerializer";
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
