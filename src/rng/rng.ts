/* eslint-disable no-bitwise -- I'm a hash RNG! */

export abstract class RNG {
  // Non-random generation uses Squirrel5 rng -- http://eiserloh.net/noise/SquirrelNoise5.hpp
  private static seed = 0xb5297a4d;
  private static SQ5_BIT_NOISE1 = 0xd2a80a3f; // 11010010101010000000101000111111
  private static SQ5_BIT_NOISE2 = 0xa884f197; // 10101000100001001111000110010111
  private static SQ5_BIT_NOISE3 = 0x6c736f4b; // 01101100011100110110111101001011
  private static SQ5_BIT_NOISE4 = 0xb79f3abb; // 10110111100111110011101010111011
  private static SQ5_BIT_NOISE5 = 0x1b56c4f5; // 00011011010101101100010011110101
  private static MAX_INT = 0x7fffffff; // 2147483647

  public static fixed = false;
  private static fallback = 1;

  public static next = (point?: string | number): number => {
    if (!RNG.fixed) {
      return Math.random();
    }

    let output: number;

    if (point === undefined) {
      output = this.fallback;
    } else if (typeof point === 'number') {
      output = point;
    } else {
      output = 0;
      Array.from(point).forEach((char) => {
        output += char.charCodeAt(0);
      });
    }

    // Squirrel5
    output *= this.SQ5_BIT_NOISE1;
    output += this.seed;
    output ^= output >> 9;
    output += this.SQ5_BIT_NOISE2;
    output ^= output >> 11;
    output *= this.SQ5_BIT_NOISE3;
    output ^= output >> 13;
    output += this.SQ5_BIT_NOISE4;
    output ^= output >> 15;
    output *= this.SQ5_BIT_NOISE5;
    output ^= output >> 17;

    if (point === undefined) {
      this.fallback = output;
    }

    return Math.abs(output / this.MAX_INT);
  };

  public static fix = (fix: boolean): void => {
    this.fixed = fix;
  };

  public static setSeed = (seed: number): void => {
    this.seed = seed;
  };
}

/* eslint-enable no-bitwise -- I'm a hash RNG! */
