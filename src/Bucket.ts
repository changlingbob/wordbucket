import WordEntry from './WordEntry';
import { ISerializedBucket, fromCSV, toCSV, load } from './BucketSerializer'

export default class Bucket {
  public static generate(identifier?: string|string[]):string {return Bucket.root.generate(identifier)};
  private static root: Bucket;
  
  public id: string;
  private children: {[key: string]: Bucket} = {};
  private parent: Bucket|null;
  private wordList: WordEntry[] = [];
  private weight: number = 0;

  constructor(name?: string|string[], parent?: Bucket) {
    if (!Bucket.root) {
      if (name === undefined) {
        Bucket.root = this;
        this.id = '';
        this.parent = null;
        return;
      } else {
        new Bucket();
      }
    }
    if (!name) {
      throw "Buckets must have a name"
    }
    if (parent && Bucket.root.findBucket(`${parent.getName()}.${name}`) 
    || !parent && Bucket.root.findBucket(name)) {
      throw "A bucket with this name already exists"
    }
    if (!(name instanceof Array)) {
      name = name.split('.');
    }
    this.id = name.slice(-1)[0];
    if (typeof parent == 'string' && parent) {
      parent = Bucket.root.findBucket(parent);
    }
    let realParent:Bucket = Bucket.root;
    if (name.length > 1) {
      const foundParent = Bucket.root.findBucket(name.slice(0,-1));
      if (foundParent && parent && foundParent !== parent) {
        throw "Supplied parent doesn't match namespaced parent"
      } else if (foundParent) {
        realParent = foundParent;
      } else if (parent) {
        realParent = parent;
      } else {
        realParent = new Bucket(name.slice(0,-1));
      }
    } else if (parent instanceof Bucket) {
      realParent = parent;
    }
    realParent.children[this.id] = this;
    this.parent = realParent;
  }
  
  public findBucket(name?: string|string[]): Bucket|undefined {
    if (!!name) {
      if (!(name instanceof Array)) {
        name = name.split('.');
      }
      let target = this.children[name[0]];
      if (target) {
        if (name.length > 1) {
          return target.findBucket(name.slice(1));
        } else {
          return target;
        }
      }
    }
    return undefined;
  }

  public getName():string {
    if (!this.parent) {
      return ''
    } else {
      return `${this.parent.getName()}${this.parent !== Bucket.root ? '.' : ''}${this.id}`;
    }
  }

  public generate(identifier?: string|string[]): string {
    const bucket = Bucket.root.findBucket(identifier);
    if (bucket) {
      return bucket.generate();
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

  public getChildren(): Bucket[] {
    const children:Bucket[] = [];
    for (let child of Object.keys(this.children)) {
      children.push(this.children[child]);
    }

    return children;
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
  
  public getWords(): WordEntry[] {
    return this.wordList;
  }

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

  public static load = load;
  public static fromCSV = fromCSV;
  public toCSV(): string {
    return toCSV(this);
  };
}