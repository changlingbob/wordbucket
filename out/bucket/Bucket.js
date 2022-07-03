import { wordSummer } from '../utils';
import { Word } from '../word';
export class Bucket {
    constructor(title = '__MISSING__') {
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
        this.generate = () => {
            const max = wordSummer(this.words) * 10;
            let accumulator = 0;
            const target = Math.floor(Math.random() * max) + 1;
            let word;
            for (let iii = 0; iii < max - 1; iii++) {
                accumulator += this.words[iii].weight * 10;
                if (accumulator >= target) {
                    word = this.words[iii];
                    break;
                }
            }
            if (word !== undefined) {
                return word.generate();
            }
            return '';
        };
        this.words = [];
        this.title = title;
    }
}
//# sourceMappingURL=Bucket.js.map