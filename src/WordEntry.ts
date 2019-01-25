import Bucket from "./Bucket";
import { ISerializedWordEntry } from "./BucketSerializer";

export default class WordEntry {
  public weight: number;
  public words: string;

  constructor(words: string, weight?: number) {
    this.words = words;
    this.weight = weight || 1;
  }

  public generate(): string {

    return this.partialGenerator(this.words, "");
  }

  public serialize(): ISerializedWordEntry {
    return {words: this.words, weight: this.weight};
  }

  private addAOrAn(input: string): string {
    const vowelArray = ["a", "e", "i", "o", "u", "1", "8"];
    let out = "";
    if (input.search(/\W/) === 0) {
      out = " ";
    }
    if (vowelArray.indexOf(input[input.search(/[a-zA-Z0-9]/)]) > -1) {
      return "an" + out;
    } else {
      return "a" + out;
    }
  }

  private partialGenerator(input: string, result: string): string {
    const command = input.search(/[\$\&]\{/);
    if (command === -1) {

      return result.concat(input);
    } else {
      let initial = input.slice(0, command);
      const commandEnd = input.slice(command + 2).indexOf("}") + command + 2;

      const remaining = input.slice(commandEnd + 1);
      const bucketName = input.slice(command + 2, commandEnd);

      const bucketResponse = Bucket.generate(bucketName);

      if (input[command] === "&") {
        initial += this.addAOrAn(bucketResponse);
      }

      return this.partialGenerator(remaining, result + initial + bucketResponse);
    }
  }
}
