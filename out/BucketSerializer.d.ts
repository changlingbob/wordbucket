import Bucket from "./Bucket";
export interface ISerializedBucket {
    name: string;
    children: ISerializedBucket[];
    words: ISerializedWordEntry[];
}
export interface ISerializedWordEntry {
    words: string;
    weight: number;
}
export declare function load(data: string, parent?: Bucket): void;
export declare function serialize(): string;
export declare function fromCSV(data: string): void;
export declare function toCSV(data: Bucket): string;
