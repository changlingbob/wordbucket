import Bucket from "../bucket";
import { DuplicateNameError, MissingBucketError } from "../errors";
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

const fetch = (title: string): Bucket => {
  if (title.length > 0) {
    const {parent, child} = pathToTuple(title);
    if (buckets[parent] !== undefined) {
      return buckets[parent].fetch(child);
    }
  }
  
  throw new MissingBucketError(`Can't find bucket named ${title}`, title)
  return new Bucket();
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

const generate = (title: string): string => {
  return fetch(title).generate();
}

const serialise = (spacing: number = 0): string => {
  return JSON.stringify(buckets);
}

export default {
  check,
  create,
  fetch,
  generate,
  serialise,
};
