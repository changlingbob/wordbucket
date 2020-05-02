// This works where other, more comprehensible custom errors don't.

export class MissingBucketError {
  public name: string;
  public message?: string;
  public title: string;
  public stack: any;

  constructor(message: string, title: string) {
    this.name = "MissingBucketError";
    this.message = message || "Bucket not found!";
    this.title = title;
    this.stack = (new Error()).stack;
  }
}
MissingBucketError.prototype = Object.create(Error.prototype);
MissingBucketError.prototype.constructor = MissingBucketError;
