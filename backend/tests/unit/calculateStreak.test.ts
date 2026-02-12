import { describe, it, expect } from 'vitest';
import { calculateStreak } from '../../src/utils/calculations';

describe('calculateStreak', () => {
  it('should return 0 streaks when no workouts', () => {
    const result = calculateStreak([]);

    expect(result).toEqual({
      currentStreak: 0,
      longestStreak: 0,
    });
  });

  it('should count single workout today', () => {
    const today = new Date();

    const result = calculateStreak([{ date: today }]);

    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
  });

  it('should calculate consecutive current streak', () => {
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000);

    const result = calculateStreak([{ date: today }, { date: yesterday }, { date: twoDaysAgo }]);

    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(3);
  });

  it('should handle broken streak correctly', () => {
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);
    const fiveDaysAgo = new Date(Date.now() - 5 * 86400000);

    const result = calculateStreak([{ date: today }, { date: yesterday }, { date: fiveDaysAgo }]);

    expect(result.currentStreak).toBe(2);
    expect(result.longestStreak).toBe(2);
  });

  it('should ignore duplicate same-day workouts', () => {
    const today = new Date();

    const result = calculateStreak([{ date: today }, { date: today }, { date: today }]);

    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
  });
});
