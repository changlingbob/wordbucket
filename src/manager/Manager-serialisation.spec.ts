import Manager from "./Manager";

describe("deserialise", () => {
  it("basically deserialises", () => {
    Manager.deserialise('{"bucket": {"words":[{"words":"word1", "weight":1}, {"words":"word2", "weight":2}], "children":{}}}');
  })
});

describe.skip("serialise", () => {

});

describe.skip("integration", () => {

});