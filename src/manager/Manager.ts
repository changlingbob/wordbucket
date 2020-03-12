import Bucket from "../bucket";

const buckets: {[key:string]: Bucket} = {};

const get = (title: string): Bucket => {
  return buckets[title] || new Bucket();
}


const create = (title: string): Bucket => {
  const bucket = new Bucket(title);
  buckets[title] = bucket

  return bucket;
}

const generate = (title: string): string => {
  return get(title).generate();
}

export default {
  create,
  get,
  generate,
};
