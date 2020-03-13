import { wordSummer, splitPath, pathEnding, pathToTuple, tupleToPath } from "./index";
import { findCommand, splitString } from "./splitter";
import Word from "../word";

const word = new Word("the", 1);

describe("wordSummer", () => {
  it("..sums weights", () => {
    expect(wordSummer([word, word, word])).toBe(3);
  });
});

describe("splitPath", () => {
  it("splits paths", () => {
    expect(splitPath("a.b.c")).toEqual(["a","b","c"]);
  })
});

describe("pathEnding", () => {
  it("gets the last part of a dotted path", () => {
    expect(pathEnding("a.b.c")).toBe("c");
  })
});

describe("pathToTuple", () => {
  it("splits the first part off a path", () => {
    expect(pathToTuple("a.b.c")).toEqual(["a", "b.c"]);
  })
});

describe("tupleToPath", () => {
  it("joins paths back together", () => {
    expect(tupleToPath(["a", "b.c"])).toBe("a.b.c");
  })
});

describe("findCommand", () => {
  it("finds commands", () => {
    expect(findCommand("0123${test}").commandChar).toBe(4);
  });
  
  it("returns -1 on empty", () => {
    expect(findCommand("no commands here").commandChar).toBe(-1);
  });
  
  it("only returns the first command", () => {
    expect(findCommand("${first command}, ${second command}").commandChar).toBe(0);
  });
})

describe("splitString", () => {
  it("does a proper no-op on commandless strings", () => {
    expect(splitString("test")).toEqual(["test"]);
  });
  
  it("breaks apart commands", () => {
    expect(splitString("test ${command} test")).toEqual(["test", "${command}", "test"])
  });
  
  it("handles weird spacing, punctuation, etc", () => {
    expect(splitString("lo, I spot a ${creature}; I guess he is of ${size}-ish height"))
    .toEqual(["lo, I spot a", "${creature}", "; I guess he is of", "${size}", "-ish height"]);
  });
});