import Manager from "../manager";
import Word from "./Word";

describe("Word", () => {
  it("generates real good", () => {
    expect(new Word("hello").generate()).toBe("hello");
  });

  it("calls other buckets", () => {
    Manager.create("test-bucket").add("words");
    expect(new Word("${test-bucket}").generate()).toBe("words");
  });

  it("can be mutated", () => {
    const word = new Word("test", 1);
    word.update({words:"foo"});
    expect(word.words).toBe("foo");
    word.update({weight: 20});
    expect(word.weight).toBe(20);
  });

  it("handles bad update arguments", () => {
    const word = new Word("test", 1);
    word.update({});
    expect(word.words).toBe("test");
    expect(word.weight).toBe(1);
  })
})
