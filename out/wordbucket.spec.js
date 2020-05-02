"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
describe("barrel file", function () {
    it("has well typed exports", function () {
        var hex = index_1.default.create("hex");
        hex.add("test1", 1);
        hex.add("test2", 1);
        hex.create("subtable");
        var subtable = index_1.default.fetch("hex.subtable");
        subtable.add("test3", 1);
        subtable.generate();
        index_1.default.generate("hex");
        expect(index_1.default.serialise()).toBe("{\"hex\":{\"children\":{\"subtable\":{\"children\":{},\"words\":[{\"words\":\"test3\",\"weight\":1}],\"title\":\"subtable\"}},\"words\":[{\"words\":\"test1\",\"weight\":1},{\"words\":\"test2\",\"weight\":1}],\"title\":\"hex\"}}");
        expect(index_1.default.deserialise("{\"hex\":{\"children\":{\"subtable\":{\"children\":{},\"words\":[{\"words\":\"test3\",\"weight\":1}],\"title\":\"subtable\"}},\"words\":[{\"words\":\"test1\",\"weight\":1},{\"words\":\"test2\",\"weight\":1}],\"title\":\"hex\"}}"));
    });
});
