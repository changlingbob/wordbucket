import { DeserialiseBucketError } from '../errors';
import { WordManager } from './Manager';
describe('deserialise', () => {
    it('basically deserialises', () => {
        WordManager.deserialise('{"good-bucket": {"words":[{"words":"word1", "weight":1}, {"words":"word2", "weight":2}]}}');
    });
    it('throws on bad input', () => {
        expect(() => WordManager.deserialise('{"bad-bucket": {"sdf":[{"words":"test 1", "weight":1}, {"words":"test 2", "weight":2}]}}')).toThrow(DeserialiseBucketError);
    });
});
describe.skip('serialise', () => { });
describe.skip('integration', () => { });
//# sourceMappingURL=Manager-serialisation.spec.js.map