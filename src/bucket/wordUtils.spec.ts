import { wordSummer } from "./wordUtils";
import Word from "../word";

const word = new Word("the", 1);

describe("wordSummer", () => {
  it("..sums weights", () => {
    expect(wordSummer([word, word, word])).toBe(3);
  });
});