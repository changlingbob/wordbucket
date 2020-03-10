import Bucket from "./bucket";
export { default as Bucket } from "./bucket";

const get = (title: string) => new Bucket();

export default {
  create: (title: string): Bucket => new Bucket(title),
  get,
  roll: (title: string): string => get(title).roll(),
};
