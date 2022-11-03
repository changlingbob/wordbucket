import { RNG } from '../rng';
import { wordSummer } from '../utils';
import { Word } from '../word';
import { Variables } from './Bucket.types';

export class Bucket {
  public title: string;
  private words: Word[];

  constructor(title = '__MISSING__') {
    this.words = [];
    this.title = title;
  }

  public add = (word: string, weight = 1): Word => {
    let words: Word | undefined = this.words.find(
      (currentWord) => currentWord.words === word
    );
    if (words !== undefined) {
      words.weight = weight;
    } else {
      words = new Word(word, weight);
      this.words.push(words);
    }

    return words;
  };

  public remove = (word: Word): void => {
    const wordIndex = this.words.indexOf(word);
    if (wordIndex > -1) {
      this.words.splice(wordIndex, 1);
    }
  };

  public getWords = (): Word[] => this.words;

  public generate = (variables?: Variables): string => {
    const genVariables = variables || {};
    const max = wordSummer(this.words) * 10;
    let accumulator = 0;

    const rng = RNG.next(variables?.seed);

    const target = Math.floor(rng * max) + 1;
    let word: Word | undefined;

    for (let iii = 0; iii < max - 1; iii++) {
      accumulator += this.words[iii].weight * 10;
      if (accumulator >= target) {
        word = this.words[iii];
        break;
      }
    }

    if (word !== undefined) {
      return word.generate({ ...genVariables, seed: `${rng}` });
    }

    return '';
  };
}
