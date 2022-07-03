import { MissingBucketError } from '../errors';
import Manager, { VARS } from '../manager';
import { checkFullToken, checkSubToken, splitString } from '../utils';

class Word {
  public words: string;
  public weight: number;

  constructor(words: string, weight = 1) {
    this.words = words;
    this.weight = weight;
  }

  public generate = (): string => {
    const tokens: string[] = splitString(this.words);
    // eslint-disable-next-line no-restricted-syntax
    for (const token in tokens) {
      if (checkFullToken(tokens[token])) {
        const fragments = [];
        const subTokens = tokens[token].slice(2, -1).split(/, ?/);

        let aOrAn = '';

        // eslint-disable-next-line no-restricted-syntax
        for (const subToken of subTokens) {
          if (checkSubToken(subToken)) {
            // set flags for special cases here;
            switch (subToken.slice(1)) {
              case 'a':
              case 'an':
                aOrAn = subToken.slice(1);
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
            } catch (e: any) {
              if (typeof e === typeof MissingBucketError) {
                // eslint-disable-next-line no-console
                console.error('Swallowing error:');
                // eslint-disable-next-line no-console
                console.error(e);
                fragments.push(`!!! ${e.message} !!!`);
              } else {
                throw e;
              }
            }
          }
        }

        let output = fragments.join(', ');
        const outputPrepend = (fragment: string) => {
          if (output.length > 0) {
            output = `${fragment} ${output}`;
          } else {
            output = fragment;
          }
        };

        if (aOrAn.length > 0) {
          const vowelArray = ['a', 'e', 'i', 'o', 'u', '1', '8'];
          const firstChar = output.match(/[a-zA-Z0-9]/)?.pop();
          if (firstChar && vowelArray.indexOf(firstChar) > -1) {
            outputPrepend('an');
          } else if (firstChar) {
            outputPrepend('a');
          } else {
            outputPrepend(aOrAn);
          }
        }

        tokens[token] = output;
      }
    }

    return tokens.join(' ').trim();
  };

  public update = (update: { words?: string; weight?: number }): void => {
    const { words, weight } = update;
    if (words !== undefined) {
      this.words = words;
    }
    if (weight !== undefined) {
      this.weight = weight;
    }
  };
}

export default Word;
