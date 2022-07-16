import { Variables } from 'src/bucket/Bucket.types';
export declare class Word {
    words: string;
    weight: number;
    constructor(words: string, weight?: number);
    generate: (variables: Variables) => string;
    update: (update: {
        words?: string;
        weight?: number;
    }) => void;
}
