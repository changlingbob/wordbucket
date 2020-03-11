import Bucket from "../bucket";

const buckets: {[key:string]: Bucket} = {};

const get = (title: string) => new Bucket(title);

const create = (title: string): Bucket => {
  const bucket = new Bucket(title);
  buckets[title] = bucket

  return bucket;
}

export default {
  create,
  get,
  roll: (title: string): string => get(title).roll(),
};
