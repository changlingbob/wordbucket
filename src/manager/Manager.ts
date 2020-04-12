import Bucket from "../bucket";
import { DuplicateNameError, MissingBucketError, DeserialiseBucketError } from "../errors";
import { pathToTuple, getParentFromPath } from "../utils";

const buckets: {[key:string]: Bucket} = {};

const check = (title: string = ""): boolean => {
  if (title.length === 0) {
    return true;
  }

  const {parent, child} = pathToTuple(title);
  if (buckets[parent] === undefined) {
    return false;
  }

  return buckets[parent].check(child);
}

const fetch = (title: string = ""): Bucket => {
  if (title.length > 0) {
    const {parent, child} = pathToTuple(title);
    if (buckets[parent] !== undefined) {
      return buckets[parent].fetch(child);
    }
  }

  throw new MissingBucketError(`Can't find bucket named ${title}`, title)
}

const create = (title: string): Bucket => {
  if (check(title)) {
    throw new DuplicateNameError(`A bucket with the name '${title}' already exists`, fetch(title));
  }
  if (!!!check(getParentFromPath(title))) {
    throw new MissingBucketError(`The parent of the bucket ${title} does not exist yet!`, title);
  }

  const bucket = new Bucket(title);
  buckets[title] = bucket

  return bucket;
}

const attach = (bucket: Bucket): void => {
  if (buckets[bucket.title]) {
    throw new DuplicateNameError(`Tried to attach ${bucket.title} to the root, but one already exists`, bucket)
  }

  buckets[bucket.title] = bucket;
}

const detach = (bucket: Bucket): void => {
  delete buckets[bucket.title];
}

const generate = (title: string): string => {
  return fetch(title).generate();
}

const serialise = (spacing: number = 0): string => {
  return JSON.stringify(buckets, null, spacing);
}

const decompress = (input: any, bucket: Bucket): void => {
  for (const title of Object.keys(input)) {
    const child = input[title];
    if (bucket.check(title)) {
      for (const word of child.words) {
        bucket.fetch(title).add(word.words, word.weight);
      }
    } else {
      bucket.create(title);
    }
    if (child.children) {
      decompress(child.children, bucket.fetch(title));
    }
  }
};

const deserialise = (input: string): void => {
  let title;
  try {
    const obj = JSON.parse(input);
    for (title of Object.keys(obj)) {
      const bucket = obj[title];
      if (check(title)) {
        for (const word of bucket.words) {
          fetch(title).add(word.words, word.weight);
        }
      } else {
        create(title);
      }
      if (bucket.children) {
        decompress(bucket.children, fetch(title));
      }
    }
  } catch (e) {
    throw new DeserialiseBucketError(`Couldn't parse bucket ${title}`, e);
  }
  console.log(serialise(2));
}

const getBuckets = (): Bucket[] => {
  return Object.values(buckets);
}

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
