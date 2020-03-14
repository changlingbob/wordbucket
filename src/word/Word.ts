import Manager, { VARS } from "../manager";
import { splitString } from "../utils";

class Word {
  private words: string;
  public weight: number;

  constructor(words: string, weight: number = 1) {
    this.words = words;
    this.weight = weight;
  }

  public generate = (): string => {
    const tokens: string[] = splitString(this.words);

    for (const token in tokens) {
      if (tokens[token][0] === VARS.COMMAND) {
        tokens[token] = "test";
      }
    }

    // return tokens.join(" ");
    return this.words;
  }
}

export default Word;