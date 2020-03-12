import Bucket from "./index";

describe("barrel file", () => {
  it("has well typed exports", () => {
    const hex = Bucket.create("hex");
    hex.add("test1", 1);
    hex.add("test2", 1);
    hex.create("subtable");
    const subtable = Bucket.get("hex.subtable");
    subtable.add("test3", 1);
    subtable.generate();

    Bucket.generate("hex");
  })
})