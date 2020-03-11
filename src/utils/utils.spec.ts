import { wordSummer, splitPath, pathEnding, pathToTuple, tupleToPath } from "./index";
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
