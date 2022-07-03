import { MissingBucketError } from '../errors';
import { WordManager } from '../manager';
import { checkFullToken, checkSubToken, splitString } from '../utils';
export class Word {
    constructor(words, weight = 1) {
        this.generate = () => {
            const tokens = splitString(this.words);
            return tokens
                .map((token) => {
                var _a;
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
                        }
                        else {
                            try {
                                const word = WordManager.generate(subToken);
                                if (word.length > 0) {
                                    return word;
                                }
                            }
                            catch (e) {
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
                    const outputPrepend = (fragment) => {
                        if (output.length > 0) {
                            output = `${fragment} ${output}`;
                        }
                        else {
                            output = fragment;
                        }
                    };
                    if (aOrAn.length > 0) {
                        const vowelArray = ['a', 'e', 'i', 'o', 'u', '1', '8'];
                        const firstChar = (_a = output.match(/[a-zA-Z0-9]/)) === null || _a === void 0 ? void 0 : _a.pop();
                        if (firstChar && vowelArray.indexOf(firstChar) > -1) {
                            outputPrepend('an');
                        }
                        else if (firstChar) {
                            outputPrepend('a');
                        }
                        else {
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
        this.update = (update) => {
            const { words, weight } = update;
            if (words !== undefined) {
                this.words = words;
            }
            if (weight !== undefined) {
                this.weight = weight;
            }
        };
        this.words = words;
        this.weight = weight;
    }
}
//# sourceMappingURL=Word.js.map