import { Bucket } from '../bucket';

export class DuplicateNameError extends Error {
  public name: string;
  public message: string;
  public duplicate: Bucket;

  constructor(message: string, bucket: Bucket) {
    super(message);
    this.name = 'DuplicateNameError';
    this.message = message || 'Duplicate name!';
    this.duplicate = bucket;
  }
}
