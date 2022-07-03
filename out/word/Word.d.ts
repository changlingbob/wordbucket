export declare class Word {
    words: string;
    weight: number;
    constructor(words: string, weight?: number);
    generate: () => string;
    update: (update: {
        words?: string;
        weight?: number;
    }) => void;
}
