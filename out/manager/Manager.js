import { Bucket } from '../bucket';
import { DeserialiseBucketError, DuplicateNameError, MissingBucketError, ReservedWordError, } from '../errors';
import { SUBTOKENS } from '../word';
import { CONST, VARS } from '.';
const buckets = {};
const check = (title = '') => !title || !!buckets[title];
const fetch = (title = '') => {
    if (buckets[title]) {
        return buckets[title];
    }
    throw new MissingBucketError(`Can't find bucket named ${title}`, title);
};
const create = (title) => {
    if (check(title)) {
        throw new DuplicateNameError(`A bucket with the name '${title}' already exists`, fetch(title));
    }
    if (!title[0].match(CONST.BAD_COMMANDS) &&
        SUBTOKENS.indexOf(title.slice(1)) > -1) {
        throw new ReservedWordError(`The title ${title} is too close to a reserved command word`, title);
    }
    if (title[0] === VARS.COMMAND) {
        throw new ReservedWordError(`The title ${title} begins with the command character`, title);
    }
    const bucket = new Bucket(title);
    buckets[title] = bucket;
    return bucket;
};
const attach = (bucket) => {
    if (check(bucket.title)) {
        throw new DuplicateNameError(`Tried to attach ${bucket.title} to the root, but one already exists`, bucket);
    }
    buckets[bucket.title] = bucket;
};
const remove = (bucket) => {
    if (check(bucket)) {
        delete buckets[bucket];
    }
};
const detach = (bucket) => {
    if (check(bucket.title)) {
        delete buckets[bucket.title];
    }
};
const generate = (title, variables) => fetch(title).generate(variables);
const serialise = (...bucketTitle) => {
    if (bucketTitle.length > 0) {
        const serialObj = {};
        bucketTitle.forEach((title) => {
            if (check(title)) {
                serialObj[title] = fetch(title);
            }
        });
        return JSON.stringify(serialObj);
    }
    return JSON.stringify(buckets);
};
const decompress = (input, bucket) => {
    Object.keys(input).forEach((title) => {
        const child = input[title];
        const newTitle = `${bucket}.${title}`;
        if (!check(newTitle)) {
            create(newTitle);
        }
        child.words.forEach((word) => {
            fetch(newTitle).add(word.words, word.weight);
        });
        if (child.children) {
            decompress(child.children, newTitle);
        }
    });
};
const deserialise = (input) => {
    let title = '';
    try {
        const obj = JSON.parse(input);
        Object.keys(obj).forEach((dataTitle) => {
            title = dataTitle;
            const bucket = obj[title];
            let toAdd;
            if (!check(title)) {
                toAdd = new Bucket(title);
                attach(toAdd);
            }
            else {
                toAdd = fetch(title);
            }
            bucket.words.forEach((word) => {
                fetch(title).add(word.words, word.weight);
            });
            if (bucket.children) {
                decompress(bucket.children, title);
            }
        });
    }
    catch (e) {
        remove(title);
        throw new DeserialiseBucketError(`Couldn't parse bucket ${title}`, e);
    }
    // console.log(serialise(2));
};
const getBuckets = () => Object.values(buckets);
export const WordManager = {
    attach,
    check,
    create,
    deserialise,
    detach,
    fetch,
    generate,
    getBuckets,
    remove,
    serialise,
};
//# sourceMappingURL=Manager.js.map