import { MissingBucketError } from '../errors';
import Manager from '../manager';
import { checkFullToken, checkSubToken, splitString } from '../utils';
class Word {
    constructor(words, weight = 1) {
        this.generate = () => {
            var _a;
            const tokens = splitString(this.words);
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
                        }
                        else {
                            try {
                                const word = Manager.generate(subToken);
                                if (word.length > 0) {
                                    fragments.push(word);
                                }
                            }
                            catch (e) {
                                if (typeof e === typeof MissingBucketError) {
                                    // eslint-disable-next-line no-console
                                    console.error('Swallowing error:');
                                    // eslint-disable-next-line no-console
                                    console.error(e);
                                    fragments.push(`!!! ${e.message} !!!`);
                                }
                                else {
                                    throw e;
                                }
                            }
                        }
                    }
                    let output = fragments.join(', ');
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
                    tokens[token] = output;
                }
            }
            return tokens.join(' ').trim();
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
export default Word;
//# sourceMappingURL=Word.js.map