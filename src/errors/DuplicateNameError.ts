import { Bucket } from '../bucket';

// This works where other, more comprehensible custom errors don't.

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
