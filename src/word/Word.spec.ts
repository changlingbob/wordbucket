import Word from "./Word";

describe("Word", () => {
  it("rolls real good", () => {
    expect(new Word("hello").roll()).toBe("hello");
  });
})