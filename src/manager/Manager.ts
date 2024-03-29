import { Bucket } from '../bucket';
import { Variables } from '../bucket/Bucket.types';
import {
  DeserialiseBucketError,
  DuplicateNameError,
  MissingBucketError,
  ReservedWordError,
} from '../errors';
import { RNG } from '../rng';
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

const remove = (bucket: string): void => {
  if (check(bucket)) {
    delete buckets[bucket];
  }
};

const detach = (bucket: Bucket): void => {
  if (check(bucket.title)) {
    delete buckets[bucket.title];
  }
};

const generate = (title: string, variables?: Variables): string =>
  fetch(title).generate(variables);

const serialise = (...bucketTitle: string[]): string => {
  if (bucketTitle.length > 0) {
    const serialObj: { [key: string]: Bucket } = {};
    bucketTitle.forEach((title) => {
      if (check(title)) {
        serialObj[title] = fetch(title);
      }
    });

    return JSON.stringify(serialObj);
  }

  return JSON.stringify(buckets);
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
        decompress(bucket.children, title);
      }
    });
  } catch (e) {
    remove(title);
    throw new DeserialiseBucketError(
      `Couldn't parse bucket ${title}`,
      e as Error
    );
  }
  // console.log(serialise(2));
};

const seedRNG = (seed?: number) => {
  if (seed !== undefined) {
    RNG.fix(true);
    RNG.setSeed(seed);
  } else {
    RNG.fix(false);
  }
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
  remove,
  seedRNG,
  serialise,
};
