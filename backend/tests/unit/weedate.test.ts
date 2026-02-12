import { describe, it, expect } from 'vitest';
import { getWeekDates } from '../../src/utils/calculations';

describe('getWeekDates', () => {
  it('should return correct dates for week 1 of 2024', () => {
    const { startDate, endDate } = getWeekDates(2024, 1);

    expect(startDate.getDay()).toBe(1); // Monday
    expect(endDate.getDay()).toBe(0); // Sunday
  });

  it('should return correct range length (7 days)', () => {
    const { startDate, endDate } = getWeekDates(2024, 10);

    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    expect(diff).toBe(6);
  });

  it('should give consistent week boundaries', () => {
    const { startDate, endDate } = getWeekDates(2024, 25);

    expect(startDate.getDay()).toBe(1);
    expect(endDate.getDay()).toBe(0);
  });

  it('should handle late-year weeks correctly', () => {
    const { startDate, endDate } = getWeekDates(2024, 52);

    expect(startDate.getFullYear()).toBeGreaterThanOrEqual(2024);
    expect(endDate.getFullYear()).toBeGreaterThanOrEqual(2024);
  });

  it('start date should always be before end date', () => {
    const { startDate, endDate } = getWeekDates(2024, 30);

    expect(startDate.getTime()).toBeLessThan(endDate.getTime());
  });
});
