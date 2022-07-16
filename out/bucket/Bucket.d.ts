import { Word } from '../word';
import { Variables } from './Bucket.types';
export declare class Bucket {
    title: string;
    private words;
    constructor(title?: string);
    add: (word: string, weight?: number) => Word;
    remove: (word: Word) => void;
    getWords: () => Word[];
    generate: (variables?: Variables) => string;
}
