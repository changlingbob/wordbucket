"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = __importDefault(require("./Manager"));
var errors_1 = require("../errors");
describe("deserialise", function () {
    it("basically deserialises", function () {
        Manager_1.default.deserialise('{"good-bucket": {"words":[{"words":"word1", "weight":1}, {"words":"word2", "weight":2}], "children":{}}}');
    });
    it("throws on bad input", function () {
        expect(function () { return Manager_1.default.deserialise('{"bad-bucket": {"sdf":[{"words":"test 1", "weight":1}, {"words":"test 2", "weight":2}], "children":{}}}'); })
            .toThrow(errors_1.DeserialiseBucketError);
    });
});
describe.skip("serialise", function () {
});
describe.skip("integration", function () {
});
