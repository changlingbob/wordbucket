export declare abstract class RNG {
    private static seed;
    private static SQ5_BIT_NOISE1;
    private static SQ5_BIT_NOISE2;
    private static SQ5_BIT_NOISE3;
    private static SQ5_BIT_NOISE4;
    private static SQ5_BIT_NOISE5;
    private static MAX_INT;
    private static fixed;
    private static fallback;
    static next: (point?: string | number) => number;
    static fix: (fix: boolean) => void;
    static setSeed: (seed: number) => void;
}
