import Bucket from "./Bucket";

export interface ISerializedBucket {
  name: string;
  children: ISerializedBucket[];
  words: ISerializedWordEntry[];
}

export interface ISerializedWordEntry {
  words: string;
  weight: number;
}

export function load(data: string, parent?: Bucket): void {
  try {
    const input = JSON.parse(data);
    Bucket.deserialize(input, parent);
  } catch (e) {
    throw new Error(`Couldn't parse saved data: ${e}`);
  }
  return;
}

export function serialize(): string {
  return Bucket.serialize();
}

function parseCsvRow(data: string): string[] {
  try {
    const result: string[] = [];
    let stringFragment = "";
    let quoteMode = false;
    for (let char = 0; char < data.length; char++) {
      if (data[char] === "\"") {
        if (data[char + 1] === "\"") {
          char++;
          stringFragment += "\"";
        } else {
          quoteMode = !quoteMode;
        }
      } else if (data[char] === "," && !quoteMode) {
        result.push(stringFragment);
        stringFragment = "";
      } else {
        stringFragment += data[char];
      }
    }
    result.push(stringFragment);
    return result;
  } catch (e) {
    throw new Error(`Failed to parse CSV row:\n${data}\nException: ${e}`);
  }
}

export function fromCSV(data: string): void {
  const rows: string[] = data.split("\n");
  const cells: string[][] = rows.map(parseCsvRow);

  try {
    const buckets: (Bucket|null)[] = [];
    for (const row of cells) {
      for (let cell = 0; cell < row.length; cell++) {
        if (row === cells[0]) {
          if (row[cell] !== "") {
            buckets.push(new Bucket(row[cell]));
          } else {
            buckets.push(null);
          }
        } else {
          const bucket = buckets[cell];
          if (bucket !== null && row[cell + 1] !== "") {
            bucket.putWords(row[cell], +row[cell + 1]);
            cell++;
          }
        }
      }
    }
  } catch (e) {
    throw new Error(`Failed generating data from CSV.\nException: ${e}`);
  }
}

let exportBuckets: IDumbBucket[];
interface IDumbBucket {
  name: string;
  words: string[];
  weights: number[];
}

export function toCSV(data: Bucket): string {
  exportBuckets = [];
  csvHelper(data);

  let maxArray = 0;
  for (const bucket of exportBuckets) {
    if (maxArray < bucket.words.length) {
      maxArray = bucket.words.length;
    }
  }

  const outputBuckets = exportBuckets.map((bucket) => {
    const newBucket: IDumbBucket = {name: bucket.name, words: [], weights: []};
    for (let iii = 0; iii < maxArray; iii++) {
      newBucket.words.push(bucket.words[iii] || "");
      newBucket.weights.push(bucket.weights[iii] || 0);
    }
    return newBucket;
  });

  let outString = "";
  for (let counter = -1; counter < maxArray; counter++) {
    for (const bucket of outputBuckets) {
      if (counter === -1) {
        outString += `${makeCsvCell(bucket.name)},,`;
      } else {
        outString += `${makeCsvCell(bucket.words[counter])},${(bucket.weights[counter] || "")},`;
      }
    }
    outString = outString.slice(0, -1) + "\n";
  }

  return outString;
}

function makeCsvCell(cell: string): string {
  cell = cell.replace(/"/, '""');
  if (cell.indexOf(",") > -1) {
    cell = `"${cell}"`;
  }
  return cell;
}

function csvHelper(data: Bucket): void {
  const bucket: IDumbBucket = {
    name: data.getName(),
    weights: [],
    words: [],
  };
  const wordList = data.getWords();
  for (const word of wordList) {
    bucket.words.push(word.words);
    bucket.weights.push(word.weight);
  }
  exportBuckets.push(bucket);
  for (const child of data.getChildren()) {
    csvHelper(child);
  }
}
