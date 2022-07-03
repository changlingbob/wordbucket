import { MissingBucketError } from '../errors';
import { VARS, WordManager } from '../manager';
import { checkFullToken, checkSubToken, splitString } from '../utils';

export class Word {
  public words: string;
  public weight: number;

  constructor(words: string, weight = 1) {
    this.words = words;
    this.weight = weight;
  }

  public generate = (): string => {
    const tokens: string[] = splitString(this.words);

    return tokens
      .map((token) => {
        if (checkFullToken(token)) {
          const subTokens = token.slice(2, -1).split(/, ?/);

          let aOrAn = '';

          const fragments = subTokens.map((subToken) => {
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
                const word = WordManager.generate(subToken);
                if (word.length > 0) {
                  return word;
                }
              } catch (e: any) {
                if (typeof e === typeof MissingBucketError) {
                  // eslint-disable-next-line no-console -- error handling
                  console.error('Swallowing error: \n', e);

                  return `!!! ${e.message} !!!`;
                }

                throw e;
              }
            }

            return '';
          });

          let output = fragments
            .filter((fragment) => fragment.length > 0)
            .join(', ');
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

          return output;
        }

        return token;
      })
      .join(' ')
      .trim();
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
