import Manager from "./Manager";
import Bucket from "../bucket";
import { DuplicateNameError, MissingBucketError } from "../errors";

const test = Manager.create("test-bucket");
const nested = test.create("nested-bucket");

describe("Manager", () => {
  it("returns the correct bucket with fetch", () => {
    expect(Manager.fetch("test-bucket")).toBe(test);
    expect(Manager.fetch("test-bucket.nested-bucket")).toBe(nested);
  });

  it("throws when fetching bad buckets", () => {
    expect(() => {Manager.fetch()}).toThrow(MissingBucketError);
    expect(() => {Manager.fetch("bad-bucket")}).toThrow(MissingBucketError);
    expect(() => {Manager.fetch("test-bucket.bad-bucket")}).toThrow(MissingBucketError);
  })

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

  it("attaches fresh buckets properly", () => {
    const bucket = new Bucket ("attached-bucket");
    Manager.attach(bucket);
    expect(Manager.fetch("attached-bucket")).toBe(bucket);
  });

  it("detaches buckets properly", () => {
    const bucket = Manager.create("detach-bucket");
    Manager.detach(bucket);
    expect(() => Manager.fetch("detach-bucket")).toThrow(MissingBucketError);
  });

  it("attach doesn't double attach", () => {
    const bucket = new Bucket("double-attach");
    Manager.attach(bucket);
    expect(() => Manager.attach(bucket)).toThrow(DuplicateNameError);
  });
});