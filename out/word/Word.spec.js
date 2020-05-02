"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = __importDefault(require("../manager"));
var Word_1 = __importDefault(require("./Word"));
describe("Word", function () {
    it("generates real good", function () {
        expect(new Word_1.default("hello").generate()).toBe("hello");
    });
    it("calls other buckets", function () {
        manager_1.default.create("test-bucket").add("words");
        expect(new Word_1.default("${test-bucket}").generate()).toBe("words");
    });
    it("can be mutated", function () {
        var word = new Word_1.default("test", 1);
        word.update({ words: "foo" });
        expect(word.words).toBe("foo");
        word.update({ weight: 20 });
        expect(word.weight).toBe(20);
    });
    it("handles bad update arguments", function () {
        var word = new Word_1.default("test", 1);
        word.update({});
        expect(word.words).toBe("test");
        expect(word.weight).toBe(1);
    });
    describe("command words", function () {
        manager_1.default.create("vowel-bucket").add("elephant");
        manager_1.default.create("consonant-bucket").add("words");
        describe("a/an", function () {
            it("defaults to the command", function () {
                expect(new Word_1.default("${$a} test").generate()).toBe("a test");
                expect(new Word_1.default("${$an} test").generate()).toBe("an test");
            });
            it("manages vowel lookup command", function () {
                expect(new Word_1.default("${$a, vowel-bucket} test").generate()).toBe("an elephant test");
            });
            it("manages consonant lookup command", function () {
                expect(new Word_1.default("${$a, consonant-bucket} test").generate()).toBe("a words test");
            });
        });
    });
});
