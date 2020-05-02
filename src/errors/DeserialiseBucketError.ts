// This works where other, more comprehensible custom errors don't.

export class DeserialiseBucketError {
  public name: string;
  public message?: string;
  public rootError: Error;
  public stack: any;

  constructor(message: string, error: Error) {
    this.name = "DeserialiseBucketError";
    this.message = message || "Couldn't parse json";
    this.rootError = error;
    this.stack = (new Error()).stack;
  }
}
DeserialiseBucketError.prototype = Object.create(Error.prototype);
DeserialiseBucketError.prototype.constructor = DeserialiseBucketError;
