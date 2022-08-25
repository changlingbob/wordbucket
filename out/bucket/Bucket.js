import { wordSummer } from '../utils';
import { Word } from '../word';
var Bucket = /** @class */ (function () {
    function Bucket(title) {
        if (title === void 0) { title = '__MISSING__'; }
        var _this = this;
        this.add = function (word, weight) {
            if (weight === void 0) { weight = 1; }
            var words = _this.words.find(function (currentWord) { return currentWord.words === word; });
            if (words !== undefined) {
                words.weight = weight;
            }
            else {
                words = new Word(word, weight);
                _this.words.push(words);
            }
            return words;
        };
        this.remove = function (word) {
            var wordIndex = _this.words.indexOf(word);
            if (wordIndex > -1) {
                _this.words.splice(wordIndex, 1);
            }
        };
        this.getWords = function () { return _this.words; };
        this.generate = function (variables) {
            var genVariables = variables || {};
            var max = wordSummer(_this.words) * 10;
            var accumulator = 0;
            var target = Math.floor(Math.random() * max) + 1;
            var word;
            for (var iii = 0; iii < max - 1; iii++) {
                accumulator += _this.words[iii].weight * 10;
                if (accumulator >= target) {
                    word = _this.words[iii];
                    break;
                }
            }
            if (word !== undefined) {
                return word.generate(genVariables);
            }
            return '';
        };
        this.words = [];
        this.title = title;
    }
    return Bucket;
}());
export { Bucket };
//# sourceMappingURL=Bucket.js.map