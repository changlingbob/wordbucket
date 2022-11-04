import { Variables } from '../bucket/Bucket.types';
import {
  MissingBucketError,
  ReadVariableError,
  SetVariableError,
} from '../errors';
import { WordManager } from '../manager';
import { RNG } from '../rng';
import { checkFullToken, checkSubToken, splitString } from '../utils';

export class Word {
  public words: string;
  public weight: number;

  constructor(words: string, weight = 1) {
    this.words = words;
    this.weight = weight;
  }

  public generate = (variables: Variables): string => {
    const tokens: string[] = splitString(this.words);

    return tokens
      .map((token, tokenId) => {
        if (checkFullToken(token)) {
          const subTokens = token.slice(2, -1).split(/,? /);

          let aOrAn = -1;
          let setWord = false;
          let varWord = -1;
          let varTable = false;
          let title = -1;

          const fragments = subTokens.map((subToken, index) => {
            if (checkSubToken(subToken)) {
              // set flags for special cases here;
              switch (subToken.slice(1)) {
                case 'a':
                case 'an':
                  aOrAn = index;

                  return subToken.slice(1);
                case 'table':
                  varTable = true;
                // eslint-disable-next-line no-fallthrough -- explicit fallthrough
                case 'var':
                  if (subTokens.length <= index + 1) {
                    throw new ReadVariableError(
                      `Read variable syntax error with '${token} in ${this.words}`,
                      this.words
                    );
                  }
                  varWord = index;
                  break;
                case 'set':
                  if (subTokens.length !== 3) {
                    throw new SetVariableError(
                      `Set variable syntax error with '${token} in ${this.words}`,
                      this.words
                    );
                  }
                  setWord = true;
                  break;
                case 'title':
                  title = index;
                  break;
                default:
                  break;
              }
            } else if (setWord && index === 1) {
              // NOP
            } else if (varWord > -1 && varWord === index - 1) {
              const output = variables[subToken];

              if (!output && output !== '') {
                return '!!! Missing variable !!!';
              }

              if (varTable) {
                return WordManager.fetch(output).generate();
              }

              return output;
            } else {
              try {
                const vars = RNG.fixed
                  ? {
                      ...variables,
                      seed: `${RNG.next(variables.seed)}${tokens
                        .slice(0, tokenId)
                        .join('')}`,
                    }
                  : variables;
                const word = WordManager.generate(subToken, vars);
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

          if (setWord) {
            // eslint-disable-next-line prefer-destructuring, no-param-reassign -- look, don't judge me eslint
            variables[subTokens[1]] = fragments[2];

            return '';
          }

          const output = fragments.filter((fragment) => fragment.length > 0);

          if (aOrAn >= 0 && output.length > aOrAn + 1) {
            const vowelArray = ['a', 'e', 'i', 'o', 'u', '1', '8'];
            const firstChar = output[aOrAn + 1].match(/[a-zA-Z0-9]/)?.pop();
            if (firstChar && vowelArray.indexOf(firstChar) > -1) {
              output[aOrAn] = 'an';
            } else if (firstChar) {
              output[aOrAn] = 'a';
            }
          }

          if (title >= 0 && output.length >= title + 1) {
            output[title] =
              output[title][0].toUpperCase() + output[title].slice(1);
          }

          return output.join(' ');
        }

        return token;
      })
      .join('')
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
