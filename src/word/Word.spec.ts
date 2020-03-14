import Word from "./Word";

describe("Word", () => {
  it("generates real good", () => {
    expect(new Word("hello").generate()).toBe("hello");
  });
})
