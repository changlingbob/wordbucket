import Manager from "./Manager";

describe("Manager", () => {
  it("returns the correctly titled bucket with get", () => {
    expect(Manager.get("title").title).toBe("title");
  })
})