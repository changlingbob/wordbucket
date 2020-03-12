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
  
  it("probably respects weighting of words", () => {
    const test = new Bucket();
    test.add("common string", 10);
    test.add("rare string", 1);
    
    const testArray: string[] = [];
    for (let iii = 0; iii < 20; iii++) {
      testArray.push(test.generate());
    }
    
    expect(testArray.filter(s => s === "rare string").length).toBeLessThan(4);
  });
});