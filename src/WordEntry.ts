import Bucket from './Bucket';
import { ISerializedWordEntry } from './BucketSerializer';

export default class WordEntry {
  public weight: number;
  public words: string;

  constructor(words: string, weight?: number) {
    this.words = words;
    this.weight = weight || 1;
  }
  
    public generate(): string {
  
      return this.partialGenerator(this.words, '');
    }

  private partialGenerator(input: string, result: string): string {
    const command = input.indexOf('${');
    if (command === -1) {

      return result.concat(input);
    } else {
      const initial = input.slice(0, command);
      const commandEnd = input.slice(command + 2).indexOf('}') + command + 2;

      const remaining = input.slice(commandEnd + 1);
      const bucketName = input.slice(command + 2, commandEnd);

      return this.partialGenerator(remaining, result + initial + Bucket.generate(bucketName));
    }
  }

  public serialize(): ISerializedWordEntry {
    return {words: this.words, weight: this.weight};
  }
}