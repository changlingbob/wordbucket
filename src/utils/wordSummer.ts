import Word from "../word";

const wordSummer = (words:Word[]): number => {
  return words.reduce((sum, word) => sum + word.weight, 0);
}

export default wordSummer;
