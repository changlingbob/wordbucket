export class DeserialiseBucketError extends Error {
  public name: string;
  public message: string;
  public rootError: Error;

  constructor(message: string, error: Error) {
    super(message);
    this.name = 'DeserialiseBucketError';
    this.message = message || "Couldn't parse json";
    this.rootError = error;
  }
}
