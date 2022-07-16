import { WordManager } from './index';
describe('barrel file', () => {
    it('has well typed exports', () => {
        const hex = WordManager.create('hex');
        hex.add('test1', 1);
        hex.add('test2', 1);
        WordManager.create('hex.subtable');
        const subtable = WordManager.fetch('hex.subtable');
        subtable.add('test3', 1);
        subtable.generate();
        WordManager.generate('hex');
        expect(WordManager.serialise()).toBe(`{"hex":{"words":[{"words":"test1","weight":1},{"words":"test2","weight":1}],"title":"hex"},"hex.subtable":{"words":[{"words":"test3","weight":1}],"title":"hex.subtable"}}`);
        WordManager.detach(WordManager.fetch('hex'));
        WordManager.detach(WordManager.fetch('hex.subtable'));
        expect(WordManager.deserialise(`{"hex":{"children":{"subtable":{"children":{},"words":[{"words":"test3","weight":1}],"title":"subtable"}},"words":[{"words":"test1","weight":1},{"words":"test2","weight":1}],"title":"hex"}}`));
        expect(WordManager.serialise()).toBe(`{"hex":{"words":[{"words":"test1","weight":1},{"words":"test2","weight":1}],"title":"hex"},"hex.subtable":{"words":[{"words":"test3","weight":1}],"title":"hex.subtable"}}`);
        WordManager.remove('hex');
        WordManager.remove('hex.subtable');
        expect(() => WordManager.deserialise('{"hex":{"words":[{"words":"You come across ${hex.root}","weight":1}],"children":{"root":{"words":[{"words":"${hex.structure}. ${hex.additional}","weight":1}],"children":{}},"additional":{"words":[{"words":"","weight":5},{"words":"Nearby is ${hex.root}","weight":0.5}],"children":{}},"structure":{"words":[{"words":"${$a, size} number of ${hex.structure.status} statues","weight":1},{"words":"${$a, size.extreme, hex.structure.status} monastry${hex.structure.occupied}","weight":1},{"words":"${$a, size.extreme, hex.structure.status} tower${hex.structure.occupied}","weight":1},{"words":"${$a, size.extreme} obelisk","weight":1},{"words":"${$a, size.extreme} camp${hex.structure.occupied}","weight":1},{"words":"${$a, size, hex.structure.status} graveyard","weight":1},{"words":"some ${size, hex.structure.status} canals","weight":1},{"words":"${$a, size, hex.structure.status} hovel${hex.structure.occupied}","weight":1}],"children":{"occupied":{"words":[{"words":"","weight":5},{"words":". There are signs of recent occupation","weight":1},{"words":". There are friendly creatures here","weight":1},{"words":". There are neutral creatures here","weight":1},{"words":". There are unfriendly creatures here","weight":1}],"children":{}},"rarelyoccupied":{"words":[{"words":"","weight":5},{"words":"${hex.structure.occupied}","weight":1}],"children":{}},"status":{"words":[{"words":"","weight":2},{"words":"tumbledown","weight":1},{"words":"ruined","weight":1},{"words":"overgrown","weight":1},{"words":"poorly maintained","weight":1},{"words":"neatly maintained","weight":0.5},{"words":"freshly painted","weight":0.1}],"children":{}}}}}},"size":{"words":[{"words":"","weight":5},{"words":"small","weight":2},{"words":"large","weight":2},{"words":"modest","weight":1}],"children":{"extreme":{"words":[{"words":"${size}","weight":5},{"words":"tiny","weight":1},{"words":"enormous","weight":1},{"words":"huge","weight":1}],"children":{}}}}}')).not.toThrow();
        expect(() => WordManager.generate('hex')).not.toThrow();
    });
});
//# sourceMappingURL=wordbucket.spec.js.map