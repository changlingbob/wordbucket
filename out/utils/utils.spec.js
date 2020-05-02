"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wordSummer_1 = require("./wordSummer");
var namespacing_1 = require("./namespacing");
var splitter_1 = require("./splitter");
var word_1 = __importDefault(require("../word"));
var _1 = require(".");
var word = new word_1.default("the", 1);
describe("wordSummer", function () {
    it("..sums weights", function () {
        expect(wordSummer_1.wordSummer([word, word, word])).toBe(3);
    });
});
describe("splitPath", function () {
    it("splits paths", function () {
        expect(namespacing_1.splitPath("a.b.c")).toEqual(["a", "b", "c"]);
    });
});
describe("pathEnding", function () {
    it("gets the last part of a dotted path", function () {
        expect(namespacing_1.pathEnding("a.b.c")).toBe("c");
    });
});
describe("getParentFromPath", function () {
    it("gets the leading parts of a dotted path", function () {
        expect(namespacing_1.getParentFromPath("a.b.c")).toBe("a.b");
    });
});
describe("pathToTuple", function () {
    it("splits the first part off a path", function () {
        expect(namespacing_1.pathToTuple("a.b.c")).toEqual({
            parent: "a",
            child: "b.c"
        });
    });
});
describe("tupleToPath", function () {
    it("joins paths back together", function () {
        expect(namespacing_1.tupleToPath(["a", "b.c"])).toBe("a.b.c");
    });
});
describe("findCommand", function () {
    it("finds commands", function () {
        expect(splitter_1.findCommand("0123${test}").commandChar).toBe(4);
    });
    it("returns -1 on empty", function () {
        expect(splitter_1.findCommand("no commands here").commandChar).toBe(-1);
    });
    it("only returns the first command", function () {
        expect(splitter_1.findCommand("${first command}, ${second command}").commandChar).toBe(0);
    });
});
describe("splitString", function () {
    it("does a proper no-op on commandless strings", function () {
        expect(splitter_1.splitString("test")).toEqual(["test"]);
    });
    it("breaks apart commands", function () {
        expect(splitter_1.splitString("test ${command} test")).toEqual(["test", "${command}", "test"]);
    });
    it("handles weird spacing, punctuation, etc", function () {
        expect(splitter_1.splitString("lo, I spot a ${creature}; I guess he is of ${size}-ish height"))
            .toEqual(["lo, I spot a", "${creature}", "; I guess he is of", "${size}", "-ish height"]);
    });
});
describe("tokeniser", function () {
    describe("full token", function () {
        it("finds a good full token", function () {
            expect(_1.checkFullToken("${foo}")).toBe(true);
        });
        it("rejects a malformed full token", function () {
            expect(_1.checkFullToken("${foo")).toBe(false);
        });
        it("rejects typo'd full token", function () {
            expect(_1.checkFullToken("${foo}1")).toBe(false);
            expect(_1.checkFullToken("$1{foo}")).toBe(false);
            expect(_1.checkFullToken("${foo]")).toBe(false);
        });
    });
    describe("subtokens", function () {
        it("finds good subtokens", function () {
            expect(_1.checkSubToken("$a")).toBe(true);
        });
        it("rejects bad subtokens", function () {
            expect(_1.checkSubToken("$bad")).toBe(false);
        });
        it("specifically rejects full tokens", function () {
            expect(_1.checkSubToken("${a}")).toBe(false);
        });
    });
});
