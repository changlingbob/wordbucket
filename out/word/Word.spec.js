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
});
