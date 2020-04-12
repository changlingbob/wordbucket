import Word from '../word';
declare class Bucket {
    title: string;
    private children;
    private words;
    constructor(title?: string);
    create: (title: string) => Bucket;
    attach: (bucket: Bucket) => void;
    detach: (bucket: Bucket) => void;
    add: (word: string, weight?: number) => Word;
    remove: (word: Word) => void;
    getWords: () => Word[];
    generate: () => string;
    check: (title?: string) => boolean;
    fetch: (title?: string) => Bucket;
}
export default Bucket;
