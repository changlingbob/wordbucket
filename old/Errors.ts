import Bucket from "./Bucket";

// This works where other, more comprehensible custom errors don't.

export class DuplicateNameError {
  public name: string;
  public message?: string;
  public duplicate: Bucket;
  public stack: any;

  constructor(message: string, bucket: Bucket) {
    this.name = "DuplicateNameError";
    this.message = message || "Duplicate name!";
    this.duplicate = bucket;
    this.stack = (new Error()).stack;
  }
}
DuplicateNameError.prototype = Object.create(Error.prototype);
DuplicateNameError.prototype.constructor = DuplicateNameError;
