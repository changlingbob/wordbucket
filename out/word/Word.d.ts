declare class Word {
    words: string;
    weight: number;
    constructor(words: string, weight?: number);
    generate: () => string;
    update: (update: {
        words?: string | undefined;
        weight?: number | undefined;
    }) => void;
}
export default Word;
