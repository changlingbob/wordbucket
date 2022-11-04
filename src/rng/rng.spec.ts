import { RNG } from './rng';

describe('RNG', () => {
  beforeEach(() => {
    RNG.fix(false);
    RNG.setSeed(0xb5297a4d);
  });

  it('is random without seeding', () => {
    expect(RNG.next()).not.toEqual(RNG.next());
    expect(RNG.next()).not.toEqual(RNG.next());
    expect(RNG.next()).not.toEqual(RNG.next());
  });

  it('is between 0 and 1 without seeding', () => {
    expect(RNG.next()).toBeGreaterThan(0);
    expect(RNG.next()).toBeGreaterThan(0);
    expect(RNG.next()).toBeGreaterThan(0);
    expect(RNG.next()).toBeLessThan(1);
    expect(RNG.next()).toBeLessThan(1);
    expect(RNG.next()).toBeLessThan(1);
  });

  it('is between 0 and 1 with seeding', () => {
    RNG.fix(true);
    RNG.setSeed(1);
    expect(RNG.next()).toBeGreaterThan(0);
    expect(RNG.next()).toBeGreaterThan(0);
    expect(RNG.next()).toBeGreaterThan(0);
    expect(RNG.next()).toBeLessThan(1);
    expect(RNG.next()).toBeLessThan(1);
    expect(RNG.next()).toBeLessThan(1);
  });

  it('returns the same value for the same seed and point with seeding', () => {
    RNG.fix(true);
    RNG.setSeed(1);
    expect(RNG.next(2)).toEqual(RNG.next(2));
  });

  it('returns different values for different seeds but same point with seeding', () => {
    RNG.fix(true);
    RNG.setSeed(1);
    const seed1 = RNG.next(2);
    RNG.setSeed(2);
    const seed2 = RNG.next(2);
    expect(seed1).not.toEqual(seed2);
  });

  it('returns different values with no point with seeding', () => {
    RNG.fix(true);
    RNG.setSeed(1);
    expect(RNG.next()).not.toEqual(RNG.next());
    expect(RNG.next()).not.toEqual(RNG.next());
    expect(RNG.next()).not.toEqual(RNG.next());
  });

  it('is evenly-ish deistributed', () => {
    RNG.fix(true);
    RNG.setSeed(1);
    const buckets = [0, 0, 0, 0, 0];
    [...new Array(1000)].forEach(() => {
      const out = RNG.next();
      if (out < 0.2) {
        buckets[0] += 1;
      } else if (out < 0.4) {
        buckets[1] += 1;
      } else if (out < 0.6) {
        buckets[2] += 1;
      } else if (out < 0.8) {
        buckets[3] += 1;
      } else {
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

  it('generates enough entropy from seeds when fixed', () => {
    RNG.fix(true);
    RNG.setSeed(3);

    // Discovered collision in previous iteration
    expect(RNG.next(`0.13692402659772152`)).not.toEqual(
      RNG.next(`0.26087661565322273`)
    );

    expect(RNG.next('123abc')).not.toEqual(RNG.next('cba321'));
    expect(RNG.next('123abc')).not.toEqual(RNG.next('123abcd'));
    expect(RNG.next('123abc')).not.toEqual(RNG.next('123ab'));
    expect(RNG.next('123abc')).not.toEqual(RNG.next('23abc'));
    expect(RNG.next('123abc')).not.toEqual(RNG.next('0123abc'));
  });
});
