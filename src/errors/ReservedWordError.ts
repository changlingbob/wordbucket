export class ReservedWordError extends Error {
  public name: string;
  public title: string;

  constructor(message: string, title: string) {
    super(message);
    this.name = 'ReservedWordError';
    this.message = message || 'Invalid bucket title!';
    this.title = title;
  }
}
