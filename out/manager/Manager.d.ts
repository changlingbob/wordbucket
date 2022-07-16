import { Variables } from 'src/bucket/Bucket.types';
import { Bucket } from '../bucket';
export declare const WordManager: {
    attach: (bucket: Bucket) => void;
    check: (title?: string) => boolean;
    create: (title: string) => Bucket;
    deserialise: (input: string) => void;
    detach: (bucket: Bucket) => void;
    fetch: (title?: string) => Bucket;
    generate: (title: string, variables?: Variables) => string;
    getBuckets: () => Bucket[];
    remove: (bucket: string) => void;
    serialise: (...bucketTitle: string[]) => string;
};
