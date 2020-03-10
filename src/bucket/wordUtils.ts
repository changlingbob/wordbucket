const wordSummer = (words:Word[]): number {
  return words.reduce(word, sum => sum + word.weight);
}