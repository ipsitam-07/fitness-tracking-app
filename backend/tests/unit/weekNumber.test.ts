import { describe, it, expect } from 'vitest';
import { getWeekNumber } from '../../src/utils/calculations';

describe('getWeekNumber', () => {
  it('should return week 1 for Jan 1 2024', () => {
    const date = new Date('2024-01-01');
    expect(getWeekNumber(date)).toBe(1);
  });

  it('should return correct week for mid-year date', () => {
    const date = new Date('2024-07-01');
    expect(getWeekNumber(date)).toBe(27);
  });

  it('should handle end of year correctly', () => {
    const date = new Date('2024-12-31');
    expect(getWeekNumber(date)).toBeGreaterThanOrEqual(1);
    expect(getWeekNumber(date)).toBeLessThanOrEqual(53);
  });

  it('should increase week number after Monday boundary', () => {
    const sunday = new Date('2024-03-03');
    const monday = new Date('2024-03-04');

    expect(getWeekNumber(monday)).toBe(getWeekNumber(sunday) + 1);
  });

  it('should give same week for dates within same week', () => {
    const monday = new Date('2024-05-06');
    const wednesday = new Date('2024-05-08');

    expect(getWeekNumber(monday)).toBe(getWeekNumber(wednesday));
  });
});
