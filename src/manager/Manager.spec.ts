import Manager from "./Manager";

describe("Manager", () => {
  it("returns the correct bucket with get", () => {
    const test = Manager.create("title");
    expect(Manager.get("title")).toBe(test);
  });
  
  it("rolls down the tables", () => {
    const test = Manager.create("title");
    test.add("test string");
    expect(Manager.generate("title")).toBe("test string");
  })
});