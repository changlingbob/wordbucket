import Bucket from "./index";

describe("barrel file", () => {
  it("has well typed exports", () => {
    const hex = Bucket.create("hex");
    hex.add("test1", 1);
    hex.add("test2", 1);
    hex.create("subtable");
    const subtable = Bucket.fetch("hex.subtable");
    subtable.add("test3", 1);
    subtable.generate();

    Bucket.generate("hex");
    
    expect(Bucket.serialise()).toBe(`{\"hex\":{\"children\":{\"subtable\":{\"children\":{},\"words\":[{\"words\":\"test3\",\"weight\":1}],\"title\":\"subtable\"}},\"words\":[{\"words\":\"test1\",\"weight\":1},{\"words\":\"test2\",\"weight\":1}],\"title\":\"hex\"}}`);
  })
})