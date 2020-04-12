declare class Word {
    words: string;
    weight: number;
    constructor(words: string, weight?: number);
    generate: () => string;
}
export default Word;
