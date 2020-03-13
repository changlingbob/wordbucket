import Bucket from "../bucket";
import { DuplicateNameError } from "../errors";

const buckets: {[key:string]: Bucket} = {};
let COMMAND = "$";
let BRACE = ["{","}"];

const get = (title: string): Bucket => {
  return buckets[title] || new Bucket();
}


const create = (title: string): Bucket => {
  if (get(title).title === title) {
    throw new DuplicateNameError(`A bucket with the name '${title}' already exists`, get(title));
  }

  const bucket = new Bucket(title);
  buckets[title] = bucket

  return bucket;
}

const generate = (title: string): string => {
  return get(title).generate();
}

export default {
  BRACE,
  COMMAND,
  create,
  get,
  generate,
};
