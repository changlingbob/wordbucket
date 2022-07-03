import { DuplicateNameError, MissingBucketError } from '../errors';
import { pathToTuple, wordSummer } from '../utils';
import Word from '../word';
class Bucket {
    constructor(title = '__MISSING__') {
        this.create = (title) => {
            const bucket = new Bucket(title);
            this.children[title] = bucket;
            return bucket;
        };
        this.attach = (bucket) => {
            if (this.children[bucket.title]) {
                throw new DuplicateNameError(`Tried to attach ${bucket.title} to ${this.title}, but one already exists`, this);
            }
            this.children[bucket.title] = bucket;
        };
        this.detach = (bucket) => {
            delete this.children[bucket.title];
        };
        this.add = (word, weight = 1) => {
            let words = this.words.find((currentWord) => currentWord.words === word);
            if (words !== undefined) {
                words.weight = weight;
            }
            else {
                words = new Word(word, weight);
                this.words.push(words);
            }
            return words;
        };
        this.remove = (word) => {
            const wordIndex = this.words.indexOf(word);
            if (wordIndex > -1) {
                this.words.splice(wordIndex, 1);
            }
        };
        this.getWords = () => this.words;
        this.getChildren = () => Object.values(this.children);
        this.generate = () => {
            const max = wordSummer(this.words) * 10;
            let accumulator = 0;
            const target = Math.floor(Math.random() * max) + 1;
            let word;
            // eslint-disable-next-line no-restricted-syntax
            for (word of this.words) {
                accumulator += word.weight * 10;
                if (accumulator > target) {
                    break;
                }
            }
            if (word !== undefined) {
                return word.generate();
            }
            return '';
        };
        this.check = (title = '') => {
            if (title.length === 0) {
                return true;
            }
            const { parent, child } = pathToTuple(title);
            if (this.children[parent] === undefined) {
                return false;
            }
            return this.children[parent].check(child);
        };
        this.fetch = (title = '') => {
            if (title.length === 0) {
                return this;
            }
            const { parent, child } = pathToTuple(title);
            if (this.children[parent] !== undefined) {
                return this.children[parent].fetch(child);
            }
            throw new MissingBucketError(`Can't find bucket named ${title}`, title);
        };
        this.children = {};
        this.words = [];
        this.title = title;
    }
}
export default Bucket;
//# sourceMappingURL=Bucket.js.map