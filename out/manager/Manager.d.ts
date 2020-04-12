import Bucket from "../bucket";
declare const _default: {
    check: (title?: string) => boolean;
    create: (title: string) => Bucket;
    deserialise: (input: string) => void;
    fetch: (title?: string) => Bucket;
    generate: (title: string) => string;
    serialise: (spacing?: number) => string;
};
export default _default;
