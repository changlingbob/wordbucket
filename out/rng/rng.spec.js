"use strict";
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
});
//# sourceMappingURL=rng.spec.js.map