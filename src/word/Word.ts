import Manager, { VARS } from "../manager";
import { splitString, checkFullToken, checkSubToken } from "../utils";
import { MissingBucketError } from "../errors";

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
      if (checkFullToken(tokens[token])) {
        const fragments = []
        const subTokens = tokens[token].slice(2,-1).split(/, ?/);

        let aOrAn = "";

        console.log(subTokens);
        for (const subToken of subTokens) {
          if (checkSubToken(subToken)) {
            // set flags for special cases here;
            switch (subToken.slice(1)) {
              case "a":
                aOrAn = "a ";
              case "an":
                aOrAn = "an ";
                break;
              default:
                break;
            }
          } else {
            try {
              const word = Manager.generate(subToken);
              if (word.length > 0) {
                fragments.push(word);
              }
            } catch (e) {
              if (typeof e === typeof MissingBucketError) {
                // tslint:disable-next-line: no-console
                console.error("swallowing error")
                fragments.push(`!!! ${e.message} in ${e.bucket} !!!`);
              } else {
                throw e;
              }
            }
          }
        }

        let output = fragments.join(", ");
        console.log(output);
        if (output.length > 0) {
          if (aOrAn.length > 0) {
            const vowelArray = ["a", "e", "i", "o", "u", "1", "8"];
            const firstChar = output.match(/[a-zA-Z0-9]/)?.pop();
            if (firstChar && vowelArray.indexOf(firstChar) > -1) {
              output = "an " + output;
            } else if (firstChar) {
              output = "a " + output;
            } else {
              output = aOrAn + output;
            }
          }
        }

        tokens[token] = output;
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