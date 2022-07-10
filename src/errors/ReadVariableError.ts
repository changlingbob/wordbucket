export class ReadVariableError extends Error {
  public name: string;
  public word: string;

  constructor(message: string, word: string) {
    super(message);
    this.name = 'ReadVariableError';
    this.message = message || `Invalid variable read encountered in ${word}`;
    this.word = word;
  }
}
