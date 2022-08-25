import { MissingBucketError, ReadVariableError, SetVariableError, } from '../errors';
import { WordManager } from '../manager';
import { Word } from './Word';
describe('Word', function () {
    WordManager.create('test-bucket').add('words');
    WordManager.create('vowel-bucket').add('elephant');
    WordManager.create('consonant-bucket').add('words');
    WordManager.create('bar').add('bar');
    WordManager.create('baz').add('baz');
    it('generates real good', function () {
        expect(new Word('hello').generate({})).toBe('hello');
    });
    it('calls other buckets', function () {
        expect(new Word('${test-bucket}').generate({})).toBe('words');
    });
    it('can generate sentences', function () {
        expect(new Word('This generates ${test-bucket}. I like ${vowel-bucket}.').generate({})).toBe('This generates words. I like elephant.');
    });
    it('can be mutated', function () {
        var word = new Word('test', 1);
        word.update({ words: 'foo' });
        expect(word.words).toBe('foo');
        word.update({ weight: 20 });
        expect(word.weight).toBe(20);
        word.update({ words: '' });
        expect(word.words).toBe('');
        word.update({ weight: 0 });
        expect(word.weight).toBe(0);
    });
    it('handles bad update arguments', function () {
        var word = new Word('test', 1);
        word.update({});
        expect(word.words).toBe('test');
        expect(word.weight).toBe(1);
    });
    it('generates space separated inputs', function () {
        expect(new Word('${bar baz}').generate({})).toBe('bar baz');
        expect(new Word('${bar, baz}').generate({})).toBe('bar baz');
    });
    describe('command words', function () {
        describe('a/an', function () {
            it('defaults to the command', function () {
                expect(new Word('${$a} test').generate({})).toBe('a test');
                expect(new Word('${$an} test').generate({})).toBe('an test');
            });
            it('manages vowel lookup command', function () {
                expect(new Word('${$a, vowel-bucket} test').generate({})).toBe('an elephant test');
            });
            it('manages consonant lookup command', function () {
                expect(new Word('${$a, consonant-bucket} test').generate({})).toBe('a words test');
            });
            it('manages non-linear lookups', function () {
                expect(new Word('${consonant-bucket, $a, vowel-bucket} test').generate({})).toBe('words an elephant test');
            });
        });
        describe('set', function () {
            // it.skip('sets a variable for the current generation', () => {});
            it('throws on misformed commands', function () {
                expect(function () { return new Word('${$set}').generate({}); }).toThrow(SetVariableError);
                expect(function () { return new Word('${$set foo}').generate({}); }).toThrow(SetVariableError);
                expect(function () { return new Word('${$set foo bar}').generate({}); }).not.toThrow(SetVariableError);
                expect(function () { return new Word('${$set foo bar baz}').generate({}); }).toThrow(SetVariableError);
            });
            it('stores data', function () {
                var output = {};
                new Word('${$set foo vowel-bucket}').generate(output);
                expect(output.foo).toBe('elephant');
            });
        });
        describe('var', function () {
            it('throws on misformed commands', function () {
                expect(function () { return new Word('${$var}').generate({}); }).toThrow(ReadVariableError);
                expect(function () {
                    return new Word('${$var foo}').generate({ foo: 'test' });
                }).not.toThrow(ReadVariableError);
                expect(function () {
                    return new Word('${$var foo bar}').generate({ foo: 'foo' });
                }).not.toThrow(ReadVariableError);
            });
            it('loads data', function () {
                expect(new Word('${$var foo}').generate({ foo: 'test' })).toBe('test');
            });
            it('reports missing variables', function () {
                expect(new Word('${$var foo}').generate({})).toBe('!!! Missing variable !!!');
            });
            it('handles empty variables', function () {
                expect(new Word('${$var foo}').generate({ foo: '' })).toBe('');
            });
            it('works with $a', function () {
                expect(new Word('${$a $var foo}').generate({ foo: 'elephant' })).toBe('an elephant');
                expect(new Word('${$an $var foo}').generate({ foo: 'biscuit' })).toBe('a biscuit');
            });
            it('allows subsequent rules', function () {
                expect(new Word('${$var foo bar}').generate({ foo: 'foo' })).toBe('foo bar');
            });
        });
        describe('table', function () {
            it('rolls a table specified by a variable', function () {
                expect(new Word('${$table test}').generate({ test: 'vowel-bucket' })).toBe('elephant');
            });
            it('works in the middle of a sequence', function () {
                expect(new Word('${$a $table test bar}').generate({ test: 'vowel-bucket' })).toBe('an elephant bar');
            });
            it('reports a missing variable', function () {
                expect(new Word('${$table test}').generate({ foo: 'bar' })).toBe('!!! Missing variable !!!');
            });
            it("throws if a variable doesn't specify a table", function () {
                expect(function () {
                    return new Word('${$table test}').generate({ test: 'non-existant' });
                }).toThrow(MissingBucketError);
            });
        });
    });
});
//# sourceMappingURL=Word.spec.js.map