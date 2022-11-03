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
});
