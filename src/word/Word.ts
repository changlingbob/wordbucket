import Manager, { VARS } from "../manager";
import { splitString } from "../utils";

class Word {
  public words: string;
  public weight: number;

  constructor(words: string, weight: number = 1) {
    this.words = words;
    this.weight = weight;
  }

  public generate = (): string => {
    const tokens: string[] = splitString(this.words);

    for (const token in tokens) {
      if (tokens[token][0] === VARS.COMMAND) {
        tokens[token] = Manager.generate(tokens[token].slice(2,-1));
      }
    }

    return tokens.join(" ").trim();
  }

  public update = (update: {words?: string, weight?: number}): void => {
    const {words, weight} = update;
    if (words) {
      this.words = words;
    }
    if (weight) {
      this.weight = weight;
    }
  }
}

export default Word;