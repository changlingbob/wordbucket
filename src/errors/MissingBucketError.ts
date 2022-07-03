export class MissingBucketError extends Error {
  public name: string;
  public message: string;
  public title: string;

  constructor(message: string, title: string) {
    super(message);
    this.name = 'MissingBucketError';
    this.message = message || 'Bucket not found!';
    this.title = title;
  }
}
