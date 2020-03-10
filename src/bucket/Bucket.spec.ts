import Bucket from "./Bucket";

describe("Bucket", () => {
  it("has a title", () => {
    expect(new Bucket("title").title).toBe("title");
  });
});