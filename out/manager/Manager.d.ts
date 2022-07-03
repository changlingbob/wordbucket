import { Bucket } from '../bucket';
export declare const WordManager: {
    attach: (bucket: Bucket) => void;
    check: (title?: string) => boolean;
    create: (title: string) => Bucket;
    deserialise: (input: string) => void;
    detach: (bucket: Bucket) => void;
    fetch: (title?: string) => Bucket;
    generate: (title: string) => string;
    getBuckets: () => Bucket[];
    serialise: (bucketTitle?: string, spacing?: number) => string;
};
