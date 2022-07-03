import { WordManager } from '../manager';
import { Word } from './Word';
describe('Word', () => {
    it('generates real good', () => {
        expect(new Word('hello').generate()).toBe('hello');
    });
    it('calls other buckets', () => {
        WordManager.create('test-bucket').add('words');
        expect(new Word('${test-bucket}').generate()).toBe('words');
    });
    it('can be mutated', () => {
        const word = new Word('test', 1);
        word.update({ words: 'foo' });
        expect(word.words).toBe('foo');
        word.update({ weight: 20 });
        expect(word.weight).toBe(20);
        word.update({ words: '' });
        expect(word.words).toBe('');
        word.update({ weight: 0 });
        expect(word.weight).toBe(0);
    });
    it('handles bad update arguments', () => {
        const word = new Word('test', 1);
        word.update({});
        expect(word.words).toBe('test');
        expect(word.weight).toBe(1);
    });
    describe('command words', () => {
        WordManager.create('vowel-bucket').add('elephant');
        WordManager.create('consonant-bucket').add('words');
        describe('a/an', () => {
            it('defaults to the command', () => {
                expect(new Word('${$a} test').generate()).toBe('a test');
                expect(new Word('${$an} test').generate()).toBe('an test');
            });
            it('manages vowel lookup command', () => {
                expect(new Word('${$a, vowel-bucket} test').generate()).toBe('an elephant test');
            });
            it('manages consonant lookup command', () => {
                expect(new Word('${$a, consonant-bucket} test').generate()).toBe('a words test');
            });
        });
    });
});
//# sourceMappingURL=Word.spec.js.map