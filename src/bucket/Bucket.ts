import Word from '../word';
import { wordSummer } from "../utils";

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
}

export default Bucket;
