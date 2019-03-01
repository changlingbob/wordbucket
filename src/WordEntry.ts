import { parseAndRoll as rollDice } from "roll-parser";
import Bucket from "./Bucket";
import { ISerializedWordEntry } from "./BucketSerializer";

export default class WordEntry {
  public weight: number;
  public words: string;
  private parent: Bucket|undefined;

  constructor(words: string, weight?: number, bucket?: Bucket) {
    this.words = words;
    this.weight = weight || 1;
    this.parent = bucket;
  }

  public update({words, weight}: {words?: string, weight?: number}): void {
    if (words !== undefined) {
      this.words = words;
    }
    if (weight !== undefined) {
      if (this.parent) { this.parent.weight += weight - this.weight; }
      this.weight = weight;
    }
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
    if (input.search(/\S/) === 0) {
      out = " ";
    }
    if (vowelArray.indexOf(input[input.search(/[a-zA-Z0-9]/)]) > -1) {
      return "an" + out;
    } else {
      return "a" + out;
    }
  }

  private runCommand(type: string, command: string ): string {
    if (type === "d") {
      return rollDice(command);
    } else {
      return Bucket.generate(command);
    }
  }

  private partialGenerator(input: string, result: string): string {
    const command = input.search(/[\$\&d][\{\[]/);
    if (command === -1) {

      return result.concat(input).replace(/(\s)\s+/, "$1");
    } else {
      const commandChar = input[command];
      const groupingChar = input[command + 1];
      let initial = input.slice(0, command);

      const commandEnd = input.slice(command + 2).search(/[\}\]]/) + command + 2;
      const remaining = input.slice(commandEnd + 1);

      let commandOutput: string;
      const commandList = input.slice(command + 2, commandEnd).split(/,\s*/);
      commandOutput = commandList.reduce(
        (accumulator, currentValue) => {
          let output = this.runCommand(commandChar, currentValue);
          if (accumulator.length > 0 && output.length > 0) {
            if (groupingChar === "[") {
              output = accumulator + ", " + output;
            } else {
              output = accumulator + " " + output;
            }
          } else if (accumulator.length > 0) {
            output = accumulator;
          }
          return output;
        }, "",
      );

      if (commandChar === "&") {
        initial += this.addAOrAn(commandOutput);
      }

      return this.partialGenerator(remaining, result + initial + commandOutput);
    }
  }
}
