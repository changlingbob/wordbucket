import Word from "../word";

export const wordSummer = (words:Word[]): number => {
  return words.reduce((sum, word) => sum + word.weight, 0);
}
