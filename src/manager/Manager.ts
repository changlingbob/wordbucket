import { Bucket } from '../bucket';
import {
  DeserialiseBucketError,
  DuplicateNameError,
  MissingBucketError,
  ReservedWordError,
} from '../errors';
import { SUBTOKENS, Word } from '../word';
import { CONST, VARS } from '.';

const buckets: { [key: string]: Bucket } = {};

const check = (title = ''): boolean => !title || !!buckets[title];

const fetch = (title = ''): Bucket => {
  if (buckets[title]) {
    return buckets[title];
  }

  throw new MissingBucketError(`Can't find bucket named ${title}`, title);
};

const create = (title: string): Bucket => {
  if (check(title)) {
    throw new DuplicateNameError(
      `A bucket with the name '${title}' already exists`,
      fetch(title)
    );
  }
  if (
    !title[0].match(CONST.BAD_COMMANDS) &&
    SUBTOKENS.indexOf(title.slice(1)) > -1
  ) {
    throw new ReservedWordError(
      `The title ${title} is too close to a reserved command word`,
      title
    );
  }
  if (title[0] === VARS.COMMAND) {
    throw new ReservedWordError(
      `The title ${title} begins with the command character`,
      title
    );
  }

  const bucket = new Bucket(title);
  buckets[title] = bucket;

  return bucket;
};

const attach = (bucket: Bucket): void => {
  if (check(bucket.title)) {
    throw new DuplicateNameError(
      `Tried to attach ${bucket.title} to the root, but one already exists`,
      bucket
    );
  }

  buckets[bucket.title] = bucket;
};

const detach = (bucket: Bucket): void => {
  if (check(bucket.title)) {
    delete buckets[bucket.title];
  }
};

const generate = (title: string): string => fetch(title).generate();

const serialise = (bucketTitle?: string, spacing = 0): string => {
  if (bucketTitle) {
    if (check(bucketTitle)) {
      const serialObj: { [key: string]: Bucket } = {};
      serialObj[bucketTitle] = fetch(bucketTitle);

      return JSON.stringify(serialObj);
    }
    throw new MissingBucketError(
      `Could not find bucket named ${bucketTitle} to serialise`,
      bucketTitle
    );
  }

  return JSON.stringify(buckets, null, spacing);
};

type OldBuckets = {
  [key: string]: { title: string; words: Word[]; children: OldBuckets };
};

const decompress = (input: OldBuckets, bucket: string): void => {
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

const deserialise = (input: string): void => {
  let title = '';
  try {
    const obj = JSON.parse(input);

    Object.keys(obj).forEach((dataTitle) => {
      title = dataTitle;
      const bucket = obj[title];

      let toAdd: Bucket;
      if (!check(title)) {
        toAdd = new Bucket(title);
        attach(toAdd);
      } else {
        toAdd = fetch(title);
      }

      bucket.words.forEach((word: Word) => {
        fetch(title).add(word.words, word.weight);
      });

      if (bucket.children) {
        decompress(bucket.children, bucket.title);
      }
    });
  } catch (e) {
    throw new DeserialiseBucketError(
      `Couldn't parse bucket ${title}`,
      e as Error
    );
  }
  // console.log(serialise(2));
};

const getBuckets = (): Bucket[] => Object.values(buckets);

export const WordManager = {
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
