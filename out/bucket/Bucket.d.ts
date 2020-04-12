import Word from '../word';
declare class Bucket {
    title: string;
    private children;
    private words;
    constructor(title?: string);
    create: (title: string) => Bucket;
    add: (word: string, weight?: number) => Word;
    getWords: () => Word[];
    generate: () => string;
    check: (title?: string) => boolean;
    fetch: (title?: string) => Bucket;
}
export default Bucket;
