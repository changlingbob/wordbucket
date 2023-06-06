"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var rng_1 = require("./rng");
describe('RNG', function () {
    beforeEach(function () {
        rng_1.RNG.fix(false);
        rng_1.RNG.setSeed(0xb5297a4d);
    });
    it('is random without seeding', function () {
        expect(rng_1.RNG.next()).not.toEqual(rng_1.RNG.next());
        expect(rng_1.RNG.next()).not.toEqual(rng_1.RNG.next());
        expect(rng_1.RNG.next()).not.toEqual(rng_1.RNG.next());
    });
    it('is between 0 and 1 without seeding', function () {
        expect(rng_1.RNG.next()).toBeGreaterThan(0);
        expect(rng_1.RNG.next()).toBeGreaterThan(0);
        expect(rng_1.RNG.next()).toBeGreaterThan(0);
        expect(rng_1.RNG.next()).toBeLessThan(1);
        expect(rng_1.RNG.next()).toBeLessThan(1);
        expect(rng_1.RNG.next()).toBeLessThan(1);
    });
    it('is between 0 and 1 with seeding', function () {
        rng_1.RNG.fix(true);
        rng_1.RNG.setSeed(1);
        expect(rng_1.RNG.next()).toBeGreaterThan(0);
        expect(rng_1.RNG.next()).toBeGreaterThan(0);
        expect(rng_1.RNG.next()).toBeGreaterThan(0);
        expect(rng_1.RNG.next()).toBeLessThan(1);
        expect(rng_1.RNG.next()).toBeLessThan(1);
        expect(rng_1.RNG.next()).toBeLessThan(1);
    });
    it('returns the same value for the same seed and point with seeding', function () {
        rng_1.RNG.fix(true);
        rng_1.RNG.setSeed(1);
        expect(rng_1.RNG.next(2)).toEqual(rng_1.RNG.next(2));
    });
    it('returns different values for different seeds but same point with seeding', function () {
        rng_1.RNG.fix(true);
        rng_1.RNG.setSeed(1);
        var seed1 = rng_1.RNG.next(2);
        rng_1.RNG.setSeed(2);
        var seed2 = rng_1.RNG.next(2);
        expect(seed1).not.toEqual(seed2);
    });
    it('returns different values with no point with seeding', function () {
        rng_1.RNG.fix(true);
        rng_1.RNG.setSeed(1);
        expect(rng_1.RNG.next()).not.toEqual(rng_1.RNG.next());
        expect(rng_1.RNG.next()).not.toEqual(rng_1.RNG.next());
        expect(rng_1.RNG.next()).not.toEqual(rng_1.RNG.next());
    });
    it('is evenly-ish deistributed', function () {
        rng_1.RNG.fix(true);
        rng_1.RNG.setSeed(1);
        var buckets = [0, 0, 0, 0, 0];
        __spreadArray([], new Array(1000), true).forEach(function () {
            var out = rng_1.RNG.next();
            if (out < 0.2) {
                buckets[0] += 1;
            }
            else if (out < 0.4) {
                buckets[1] += 1;
            }
            else if (out < 0.6) {
                buckets[2] += 1;
            }
            else if (out < 0.8) {
                buckets[3] += 1;
            }
            else {
                buckets[4] += 1;
            }
        });
        expect(buckets[0]).toBeLessThan(300);
        expect(buckets[0]).toBeGreaterThan(100);
        expect(buckets[1]).toBeLessThan(300);
        expect(buckets[1]).toBeGreaterThan(100);
        expect(buckets[2]).toBeLessThan(300);
        expect(buckets[2]).toBeGreaterThan(100);
        expect(buckets[3]).toBeLessThan(300);
        expect(buckets[3]).toBeGreaterThan(100);
        expect(buckets[4]).toBeLessThan(300);
        expect(buckets[4]).toBeGreaterThan(100);
    });
    it('generates enough entropy from seeds when fixed', function () {
        rng_1.RNG.fix(true);
        rng_1.RNG.setSeed(3);
        // Discovered collision in previous iteration
        expect(rng_1.RNG.next("0.13692402659772152")).not.toEqual(rng_1.RNG.next("0.26087661565322273"));
        expect(rng_1.RNG.next('123abc')).not.toEqual(rng_1.RNG.next('cba321'));
        expect(rng_1.RNG.next('123abc')).not.toEqual(rng_1.RNG.next('123abcd'));
        expect(rng_1.RNG.next('123abc')).not.toEqual(rng_1.RNG.next('123ab'));
        expect(rng_1.RNG.next('123abc')).not.toEqual(rng_1.RNG.next('23abc'));
        expect(rng_1.RNG.next('123abc')).not.toEqual(rng_1.RNG.next('0123abc'));
    });
});
//# sourceMappingURL=rng.spec.js.map