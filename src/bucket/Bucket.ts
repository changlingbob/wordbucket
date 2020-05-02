import Word from '../word';
import { pathToTuple, wordSummer } from "../utils";
import { MissingBucketError, DuplicateNameError } from "../errors";

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

  public attach = (bucket: Bucket): void => {
    if (this.children[bucket.title]) {
      throw new DuplicateNameError(`Tried to attach ${bucket.title} to ${this.title}, but one already exists`, this)
    }

    this.children[bucket.title] = bucket;
  }

  public detach = (bucket: Bucket): void => {
    delete this.children[bucket.title];
  }

  public add = (word: string, weight: number = 1): Word => {
    let words: Word|undefined = this.words.find((currentWord) => currentWord.words === word);
    if (words !== undefined) {
      words.weight = weight
    } else {
      words = new Word(word, weight);
      this.words.push(words);
    }

    return words;
  }

  public remove = (word: Word): void => {
    const wordIndex = this.words.indexOf(word);
    if (wordIndex > -1) {
      this.words.splice(wordIndex, 1);
    }
  }

  public getWords = (): Word[] => {
    return this.words;
  }

  public getChildren = (): Bucket[] => {
    return Object.values(this.children);
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
  }
}

export default Bucket;
