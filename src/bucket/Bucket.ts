import Word from '../word';
import { pathToTuple, wordSummer } from "../utils";
import { MissingBucketError } from "../errors";

class Bucket {
  public title: string;
  private children: {[key:string]: Bucket};
  private words: Word[];

  constructor(title: string = "__MISSING__") {
    this.children = {};
    this.words = [];
    this.title = title;
  }

  public create = (title: string): Bucket => {
    const bucket = new Bucket(title);
    this.children[title] = bucket;

    return bucket;
  }

  public add = (word: string, weight?: number): void => {
    this.words.push(new Word(word, weight));
    return;
  }

  public generate = (): string => {
    const max = wordSummer(this.words) * 10;
    let accumulator = 0;
    const target = Math.floor(Math.random() * max) + 1;
    let word: Word|undefined;

    for (word of this.words) {
      accumulator += word.weight * 10;
      if (accumulator > target) {
        break;
      }
    }

    if (word !== undefined) {
      return word.generate();
    } else {
      return "";
    }
  }
  
  public check = (title: string= ""): boolean => {
    if (title.length === 0) {
      return true;
    }
    const {parent, child} = pathToTuple(title);
    if (this.children[parent] === undefined) {
      return false;
    }
  
    return this.children[parent].check(child);
  }
  
  public fetch = (title: string = ""): Bucket => {
    if (title.length === 0) {
      return this;
    } else {
      const {parent, child} = pathToTuple(title);
      if (this.children[parent] !== undefined) {
        return this.children[parent].fetch(child);
      }
    }
    
    throw new MissingBucketError(`Can't find bucket named ${title}`, title)
    return new Bucket();
  }

  
  // public get = (title: string): Bucket => {
  //   const name = pathToTuple(title);
  //   if (this.children[name[0]] !== undefined) {
  //     if (name[1] !== undefined) {
  //       return this.children[title].get(name[1]);
  //     } else {
  //       return this.children[title];
  //     }
  //   }
    
  //   throw new MissingBucketError(`Bucket with the name ${title} not found`, title);
  //   return new Bucket();
  // }

}

export default Bucket;
