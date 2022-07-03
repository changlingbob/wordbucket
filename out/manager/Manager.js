import Bucket from '../bucket';
import { DeserialiseBucketError, DuplicateNameError, MissingBucketError, ReservedWordError, } from '../errors';
import { getParentFromPath, pathToTuple } from '../utils';
import { SUBTOKENS } from '../word';
import { CONST, VARS } from '.';
const buckets = {};
const check = (title = '') => {
    if (title.length === 0) {
        return true;
    }
    const { parent, child } = pathToTuple(title);
    if (buckets[parent] === undefined) {
        return false;
    }
    return buckets[parent].check(child);
};
const fetch = (title = '') => {
    if (title.length > 0) {
        const { parent, child } = pathToTuple(title);
        if (buckets[parent] !== undefined) {
            return buckets[parent].fetch(child);
        }
    }
    throw new MissingBucketError(`Can't find bucket named ${title}`, title);
};
const create = (title) => {
    if (check(title)) {
        throw new DuplicateNameError(`A bucket with the name '${title}' already exists`, fetch(title));
    }
    if (!check(getParentFromPath(title))) {
        throw new MissingBucketError(`The parent of the bucket ${title} does not exist yet!`, title);
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
    if (buckets[bucket.title]) {
        throw new DuplicateNameError(`Tried to attach ${bucket.title} to the root, but one already exists`, bucket);
    }
    buckets[bucket.title] = bucket;
};
const detach = (bucket) => {
    delete buckets[bucket.title];
};
const generate = (title) => fetch(title).generate();
const serialise = (bucketTitle, spacing = 0) => {
    if (bucketTitle) {
        if (check(bucketTitle)) {
            const serialObj = {};
            serialObj[bucketTitle] = fetch(bucketTitle);
            return JSON.stringify(serialObj);
        }
        throw new MissingBucketError(`Could not find bucket named ${bucketTitle} to serialise`, bucketTitle);
    }
    return JSON.stringify(buckets, null, spacing);
};
const decompress = (input, bucket) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const title of Object.keys(input)) {
        const child = input[title];
        if (!bucket.check(title)) {
            bucket.create(title);
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const word of child.words) {
            bucket.fetch(title).add(word.words, word.weight);
        }
        if (child.children) {
            decompress(child.children, bucket.fetch(title));
        }
    }
};
const deserialise = (input) => {
    let title;
    try {
        const obj = JSON.parse(input);
        // eslint-disable-next-line no-restricted-syntax
        for (title of Object.keys(obj)) {
            const bucket = obj[title];
            let toAdd;
            if (!check(title)) {
                toAdd = new Bucket(title);
                attach(toAdd);
            }
            else {
                toAdd = fetch(title);
            }
            // eslint-disable-next-line no-restricted-syntax
            for (const word of bucket.words) {
                toAdd.add(word.words, word.weight);
            }
            if (bucket.children) {
                decompress(bucket.children, fetch(title));
            }
        }
    }
    catch (e) {
        throw new DeserialiseBucketError(`Couldn't parse bucket ${title}`, e);
    }
    // console.log(serialise(2));
};
const getBuckets = () => Object.values(buckets);
export default {
    attach,
    check,
    create,
    deserialise,
    detach,
    fetch,
    generate,
    getBuckets,
    serialise,
};
//# sourceMappingURL=Manager.js.map