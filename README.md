# Wordbucket

> A tool for rolling randomly on nested tables

Wordbucket handles random generation for typescript/javascript projects, by rolling on weighted random tables defined by json objects.

## Usage

You will need to both define random tables and add wordbucket to your project.

### Including wordbucket

Install wordbucket into your project with npm:

```sh
$ npm i wordbucket
```

Then, in your script:

```ts
import { Bucket, Word, WordManager } from 'wordbucket';

const bucket = new Bucket('bucket-name');
bucket.add('entry in the table');
bucket.add('a different entry');
bucket.add('an entry with a weighting other than 1', 0.2);

let text;

text = bucket.generate();
// one of 'entry in the table', 'a different entry', or 'an entry with a weighting other than 1' at a lower frequency

WordManager.attach(bucket);
text = WordManager.generate('bucket-name');
// same as above
```

WordManager is static and allows access to buckets between files, but individual buckets can be spun up as you need them. If you call out to another bucket, it will use the WordManager to find them, so you will need to `attach` those buckets.

```ts
const nested = new Bucket('nested-table');
nested.add('apples');
nested.add('bananas');
nested.add('pears');
WordManager.attach(nested);

const topLevel = new Bucket('top-level');
topLevel.add('this tree grows ${nested-table}');
topLevel.add('I like ${nested-table}');
topLevel.add("we don't have any ${nested-table}");
WordManager.attach(topLevel);
WordManager.generate('top-level');
// something of the form 'this tree grows pears' or 'I like apples'
```

If you want to store buckets as data, you can serialise and deserialise to and from string:

```ts
const data = WordManager.serialise('bucket-1', 'bucket-2');

// Save and load data

WordManager.deserialise(data);
```

You can also seed the RNG used to generate words:

```ts
// Set the RNG seed with a number
WordManager.setSeed(123);
WordManager.generate('some-bucket');

// Unset the seeded RNG with no arguments
WordManager.setSeed();
```

### Random tables

Buckets can be serialised to JSON string, but can also be written longhand, to be parsed by wordbucket. Each bucket should have a `title` which matches its key, and a `words` list of options it can generate. A sample bucket looks like this:

```json
{
  "test": {
    "title": "test",
    "words": [
      {
        "words": "elephant",
        "weight": 1
      },
      {
        "words": "banana",
        "weight": 1
      }
    ]
  }
}
```

Each entry in `words` includes a `words` property, which are the displayed result, and a `weight`, which is the relative chance of that option being chose, and which respects one decimal place.

Writing buckets in JSON saves you from having to build the buckets in code, as you can import external files that just store the data. I have built a proof of concept bucket editor, available [here](https://wordbucket-fe.github.io), where you can import and export json to see what they look like and test things out.

## Commands

As well as calling other buckets, there are a few commands that can help out your random generation. To call these, inside a `${bucket-call}`, add the command word prefixed with `$`, eg: `${$a bucket-call}`.

### `a` / `an`

Picks between `a` and `an` intelligently based on the associated generated word. Defaults to the command word if nothing following is generated.

```ts
const sizeBucket = new Bucket('size');
sizeBucket.add('tiny');
sizeBucket.add('');
sizeBucket.add('enormous');
WordManager.attach(sizeBucket);

const test = new Bucket('test');
test.add('${$an size} elephant!');
test.generate();
// either "a tiny elephant!", "an elephant", or "an enormous elephant!"
```

### `set`

Sets a variable to be used by `var` by calling a bucket to populate it. Call with `${$set varName bucket}`. Variable names are scoped separately from buckets.

```ts
const bucket = new Bucket('set-size');
bucket.add('${$set size size}');
```

### `var`

Reads a variable to be used by `set` . Call with `${$var varName}`.

```ts
const output = new Bucket('output');
output.add('I said it would be ${$var size}, and it is ${$var size}!');
const result = new Bucket('result');
result.add('${$set size size}${output}');

result.generate();
// 'I said it would be tiny, and it is tiny!'
// (both `${$var size}` in the text will always be the same)
```

### `table`

Rolls on a bucket specified by a value in a variable. To use this, you will need a bucket with a list of bucket names in. Use `set` with that bucket to generate a bucket to roll in. You can then use it like `var`, except it will generate from the named bucket each time. This is somewhat complicated meta-rolling!

### `title`

Capitalises the first letter of the result of a table or variable.

```ts
bucket.add('${$title size}');
bucket.add('${$title $var size}');
// Both 'Tiny', '' or 'Enormous'
```

## License

[ISC](./license) © Gregory Skinner
