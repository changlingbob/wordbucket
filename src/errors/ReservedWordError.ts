// This works where other, more comprehensible custom errors don't.

export class ReservedWordError {
  public name: string;
  public message?: string;
  public title: string;
  public stack: any;

  constructor(message: string, title: string) {
    this.name = "ReservedWordError";
    this.message = message || "Invalid bucket title!";
    this.title = title;
    this.stack = (new Error()).stack;
  }
}
ReservedWordError.prototype = Object.create(Error.prototype);
ReservedWordError.prototype.constructor = ReservedWordError;

