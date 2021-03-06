import Manager from "./Manager";
import { DeserialiseBucketError } from "../errors";

describe("deserialise", () => {
  it("basically deserialises", () => {
    Manager.deserialise('{"good-bucket": {"words":[{"words":"word1", "weight":1}, {"words":"word2", "weight":2}], "children":{}}}');
  })

  it("throws on bad input", () => {
    expect(() => Manager.deserialise('{"bad-bucket": {"sdf":[{"words":"test 1", "weight":1}, {"words":"test 2", "weight":2}], "children":{}}}'))
      .toThrow(DeserialiseBucketError);
  })
});

describe.skip("serialise", () => {

});

describe.skip("integration", () => {

});