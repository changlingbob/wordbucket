"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = __importDefault(require("./Manager"));
describe("deserialise", function () {
    it("basically deserialises", function () {
        Manager_1.default.deserialise('{"bucket": {"words":[{"words":"word1", "weight":1}, {"words":"word2", "weight":2}], "children":{}}}');
    });
});
describe.skip("serialise", function () {
});
describe.skip("integration", function () {
});
