import WordEntry from './WordEntry';
import { ISerializedBucket } from './BucketSerializer'

export default class Bucket {
  public static generate(identifier?: string|string[]):string {return Bucket.root.generate(identifier)};
  private static root: Bucket;
  
  public id: string;
  private children: {[key: string]: Bucket} = {};
  private wordList: WordEntry[] = [];
  private weight: number = 0;

  constructor(name?: string, parent?: Bucket|string) {
    if (!name && Bucket.root) {
      throw "Buckets must have a name"
    }
    this.id = name || '';
    if (!Bucket.root) {
      if (name === undefined) {
        Bucket.root = this;
      } else {
        Bucket.root = new Bucket();
      }
    } else if (this.findBucket(name) !== Bucket.root) {
      throw "Duplicate bucket name!"
    }
    if (parent instanceof Bucket) {
      parent.addChild(this);
    } else if (Bucket.root !== this) {
      Bucket.root.findBucket(parent).addChild(this);
    }
  }
  
  public findBucket(name?: string|string[]): Bucket {
    if (!!name) {
      if (!(name instanceof Array)) {
        name = name.split('.');
      }
      if (this.children[name[0]]) {
        if (name.length > 1) {
          return this.children[name[0]].findBucket(name.slice(1));
        } else {
          return this.children[name[0]];
        }
      }
    }
    return Bucket.root;
  }

  public generate(identifier?: string|string[]): string {
    if (identifier) {
      return Bucket.root.findBucket(identifier).generate();
    } else {
      return this.rollWords();
    }
  }

  public addChild(child: Bucket|string): void {
    if (child instanceof Bucket) {
      this.children[child.id] = child;
    } else {
      new Bucket(child, this);
    }
  }

  
  public putWords(words: WordEntry|string, weight?: number): void {
    if (words instanceof WordEntry) {
      this.wordList.push(words);
      this.weight += words.weight;
    } else {
      this.wordList.push(new WordEntry(words, weight || 1))
      this.weight += 1;
    }
  }
  public addWords = this.putWords;

  public removeWords(id: number): void {
    this.wordList.splice(id, 1);
  }

  private rollWords(): string {
    const dieSize = this.weight * 10;
    const target = Math.floor(Math.random() * dieSize + 1);
    let weightAccumulator = 0;
    let words;
    for (words of this.wordList) {
      weightAccumulator += words.weight * 10;
      if (weightAccumulator > target) {
        break;
      }
    }
    if (words) {
      return words.generate();
    } else {
      return 'miss!';
    }
  }
  
  public static serialize(): string {
    return JSON.stringify(Bucket.root.serialize());
  }

  private serialize(): ISerializedBucket {
    let output:ISerializedBucket = {
      name: this.id,
      children: [],
      words: [],
    }
    
    for (let child of Object.keys(this.children)) {
      output.children.push(this.children[child].serialize());
    }

    for (let words of this.wordList) {
      output.words.push(words.serialize());
    }

    return output;
  }

  public static deserialize(data:ISerializedBucket, parent?:Bucket): Bucket {
    let bucket = new Bucket(data.name, parent);

    for (var child of data.children) {
      this.deserialize(child, bucket);
    }

    for (var words of data.words) {
      bucket.putWords(words.words, words.weight);
    }

    return bucket;
  }
}