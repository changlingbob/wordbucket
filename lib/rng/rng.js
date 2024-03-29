"use strict";
/* eslint-disable no-bitwise -- I'm a hash RNG! */
exports.__esModule = true;
exports.RNG = void 0;
var RNG = /** @class */ (function () {
    function RNG() {
    }
    var _a;
    _a = RNG;
    // Non-random generation uses Squirrel5 rng -- http://eiserloh.net/noise/SquirrelNoise5.hpp
    RNG.seed = 0xb5297a4d;
    RNG.SQ5_BIT_NOISE1 = 0xd2a80a3f; // 11010010101010000000101000111111
    RNG.SQ5_BIT_NOISE2 = 0xa884f197; // 10101000100001001111000110010111
    RNG.SQ5_BIT_NOISE3 = 0x6c736f4b; // 01101100011100110110111101001011
    RNG.SQ5_BIT_NOISE4 = 0xb79f3abb; // 10110111100111110011101010111011
    RNG.SQ5_BIT_NOISE5 = 0x1b56c4f5; // 00011011010101101100010011110101
    RNG.MAX_INT = 0x7fffffff; // 2147483647
    RNG.fixed = false;
    RNG.fallback = 1;
    RNG.next = function (point) {
        if (!RNG.fixed) {
            return Math.random();
        }
        var output;
        if (point === undefined) {
            output = _a.fallback;
        }
        else if (typeof point === 'number') {
            output = point;
        }
        else {
            output = 0;
            Array.from(point).forEach(function (char, idx) {
                output += char.charCodeAt(0);
                output ^= output >> 3;
                output *= idx;
                output ^= output >> 7;
            });
        }
        // Squirrel5
        output *= _a.SQ5_BIT_NOISE1;
        output += _a.seed;
        output ^= output >> 9;
        output += _a.SQ5_BIT_NOISE2;
        output ^= output >> 11;
        output *= _a.SQ5_BIT_NOISE3;
        output ^= output >> 13;
        output += _a.SQ5_BIT_NOISE4;
        output ^= output >> 15;
        output *= _a.SQ5_BIT_NOISE5;
        output ^= output >> 17;
        if (point === undefined) {
            _a.fallback = output;
        }
        return Math.abs(output / _a.MAX_INT);
    };
    RNG.fix = function (fix) {
        _a.fixed = fix;
    };
    RNG.setSeed = function (seed) {
        _a.seed = seed;
    };
    return RNG;
}());
exports.RNG = RNG;
/* eslint-enable no-bitwise -- I'm a hash RNG! */
//# sourceMappingURL=rng.js.map