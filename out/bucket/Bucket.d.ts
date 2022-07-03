import { Word } from '../word';
export declare class Bucket {
    title: string;
    private words;
    constructor(title?: string);
    add: (word: string, weight?: number) => Word;
    remove: (word: Word) => void;
    getWords: () => Word[];
    generate: () => string;
}
