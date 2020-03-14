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
})
