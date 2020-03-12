import Manager from "./Manager";
import { DuplicateNameError } from "../errors";

describe("Manager", () => {
  it("returns the correct bucket with get", () => {
    const test = Manager.create("get-test");

    expect(Manager.get("get-test")).toBe(test);
  });

  it("generates down the tables", () => {
    const test = Manager.create("generate-test");
    test.add("test string");

    expect(Manager.generate("generate-test")).toBe("test string");
  });

  it("handles duplicated names", () => {
    const test = Manager.create("duplicate-test");
    expect(() => Manager.create("duplicate-test")).toThrow(DuplicateNameError);
  });
});