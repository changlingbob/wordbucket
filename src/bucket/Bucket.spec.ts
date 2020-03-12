import Bucket from "./Bucket";

describe("Bucket", () => {
  it("has a title", () => {
    expect(new Bucket("title").title).toBe("title");
  });
  it("generate does a roll", () => {
    const test = new Bucket();
    test.add("test string");
    expect(test.generate()).toBe("test string");
  });
});