import Manager from "./Manager";
import { DuplicateNameError, MissingBucketError } from "../errors";

const test = Manager.create("test-bucket");
test.create("nested-bucket");

describe("Manager", () => {
  it("returns the correct bucket with fetch", () => {
  // lies
    expect(Manager.fetch("test-bucket")).toBe(test);
  });
  
  it("correctly checks existing buckets", () => {
    expect(Manager.check("test-bucket")).toBe(true);
    expect(Manager.check("test-bucket.nested-bucket")).toBe(true);
  })

  it("correctly checks non-existant buckets", () => {
    expect(Manager.check("not-a-bucket")).toBe(false);
  })
  
  it("handles checking null-y inputs", () => {
    expect(Manager.check()).toBe(true);
    expect(Manager.check("")).toBe(true);
    expect(Manager.check(undefined)).toBe(true);
  });

  it("generates down the tables", () => {
    test.add("test string");

    expect(Manager.generate("test-bucket")).toBe("test string");
  });

  it("handles creating on non-existant buckets", () => {
    expect(() => Manager.create("bad-bucket.worse-bucket")).toThrow(MissingBucketError);
  });

  it("handles duplicated names", () => {
    expect(() => Manager.create("test-bucket")).toThrow(DuplicateNameError);
  });
});