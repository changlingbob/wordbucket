import Bucket from "../bucket";
declare const _default: {
    attach: (bucket: Bucket) => void;
    check: (title?: string) => boolean;
    create: (title: string) => Bucket;
    deserialise: (input: string) => void;
    detach: (bucket: Bucket) => void;
    fetch: (title?: string) => Bucket;
    generate: (title: string) => string;
    getBuckets: () => Bucket[];
    serialise: (spacing?: number) => string;
};
export default _default;
