export class SetVariableError extends Error {
  public name: string;
  public word: string;

  constructor(message: string, word: string) {
    super(message);
    this.name = 'SetVariableError';
    this.message = message || `Invalid variable setting encountered in ${word}`;
    this.word = word;
  }
}
