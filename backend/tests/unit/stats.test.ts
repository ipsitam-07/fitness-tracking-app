import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getWorkoutStatsService,
  getDashboardStatsService,
  getWeeklyTrendsService,
  getDailyWorkoutsService,
  getGoalProgressService,
} from '../../src/services/stats.service';

import * as statsRepo from '../../src/repositories/stats.repository';
import * as goalsRepo from '../../src/repositories/goals.repository';
import { GoalType } from '../../src/enums/goals';

vi.mock('../../src/repositories/stats.repository');
vi.mock('../../src/repositories/goals.repository');

describe('Stats Service - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // WORKOUT STATS

  describe('getWorkoutStatsService', () => {
    it('should throw if userId missing', async () => {
      await expect(getWorkoutStatsService('')).rejects.toThrow('User ID is required');
    });

    it('should calculate totals and averages', async () => {
      (statsRepo.getWorkoutStats as any).mockResolvedValue([
        { duration: 30, caloriesBurned: 200, exerciseType: 'cardio' },
        { duration: 60, caloriesBurned: 400, exerciseType: 'cardio' },
      ]);

      const result = await getWorkoutStatsService('user1');

      expect(result.totalWorkouts).toBe(2);
      expect(result.totalDuration).toBe(90);
      expect(result.totalCalories).toBe(600);
      expect(result.averageDuration).toBe(45);
      expect(result.averageCalories).toBe(300);
    });
  });

  // DASHBOARD STATS

  describe('getDashboardStatsService', () => {
    it('should throw if userId missing', async () => {
      await expect(getDashboardStatsService('')).rejects.toThrow('User ID is required');
    });

    it('should aggregate dashboard stats correctly', async () => {
      (statsRepo.getWorkoutStats as any).mockResolvedValue([
        { duration: 30, caloriesBurned: 200, exerciseType: 'cardio' },
      ]);

      (statsRepo.getRecentWorkouts as any).mockResolvedValue([
        {
          id: '1',
          exerciseName: 'Run',
          exerciseType: 'cardio',
          duration: 30,
          caloriesBurned: 200,
          date: new Date(),
        },
      ]);

      (statsRepo.getActiveGoals as any).mockResolvedValue(2);
      (statsRepo.getCompletedGoalsCount as any).mockResolvedValue(1);
      (statsRepo.getThisWeekWorkouts as any).mockResolvedValue([]);
      (statsRepo.getThisMonthWorkouts as any).mockResolvedValue([]);
      (statsRepo.getAllWorkoutsSorted as any).mockResolvedValue([]);

      const result = await getDashboardStatsService('user1');

      expect(result.result.totalWorkouts).toBe(1);
      expect(result.result.totalCalories).toBe(200);
      expect(result.result.activeGoals).toBe(2);
      expect(result.result.completedGoals).toBe(1);
    });
  });

  // WEEKLY TRENDS

  describe('getWeeklyTrendsService', () => {
    it('should throw if weeks invalid', async () => {
      await expect(getWeeklyTrendsService('user1', 0)).rejects.toThrow(
        'Weeks must be between 1 and 52',
      );
    });

    it('should group workouts by week', async () => {
      const today = new Date();

      (statsRepo.getWorkoutsByWeeks as any).mockResolvedValue([
        { duration: 30, caloriesBurned: 200, date: today },
        { duration: 60, caloriesBurned: 400, date: today },
      ]);

      const result = await getWeeklyTrendsService('user1', 4);

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]!.workouts).toBe(2);
      expect(result[0]!.duration).toBe(90);
    });
  });

  // DAILY WORKOUTS

  describe('getDailyWorkoutsService', () => {
    it('should throw if userId missing', async () => {
      await expect(getDailyWorkoutsService('')).rejects.toThrow('User ID is required');
    });

    it('should calculate daily counts', async () => {
      const today = new Date();

      (statsRepo.getWorkoutStats as any).mockResolvedValue([{ date: today }, { date: today }]);

      const result = await getDailyWorkoutsService('user1');

      const total = Object.values(result.dailyCounts).reduce((sum: number, v: any) => sum + v, 0);

      expect(total).toBe(2);
    });
  });

  // GOAL PROGRESS

  describe('getGoalProgressService', () => {
    it('should throw if goal not found', async () => {
      (goalsRepo.getGoalsbyGoalID as any).mockResolvedValue(null);

      await expect(getGoalProgressService('user1', 'goal1')).rejects.toThrow('Goal not found');
    });

    it('should calculate non-weight goal progress', async () => {
      (goalsRepo.getGoalsbyGoalID as any).mockResolvedValue({
        id: 'goal1',
        userId: 'user1',
        goalType: GoalType.CALORIES,
        targetValue: 100,
        currentValue: 50,
        startDate: new Date(),
        endDate: new Date(Date.now() + 5 * 86400000),
        status: 'active',
        description: 'Burn calories',
      });

      const result = await getGoalProgressService('user1', 'goal1');

      expect(result.progress).toBe(50);
      expect(result.remaining).toBe(50);
      expect(result.isCompleted).toBe(false);
    });

    it('should calculate weight loss progress', async () => {
      (goalsRepo.getGoalsbyGoalID as any).mockResolvedValue({
        id: 'goal1',
        userId: 'user1',
        goalType: GoalType.WEIGHT,
        startingValue: 80,
        targetValue: 70,
        currentValue: 75,
        startDate: new Date(),
        endDate: new Date(Date.now() + 10 * 86400000),
        status: 'active',
        description: 'Lose weight',
      });

      const result = await getGoalProgressService('user1', 'goal1');

      expect(result.progress).toBeGreaterThan(0);
      expect(result.remaining).toBe(5);
    });

    it('should throw 403 if goal belongs to another user', async () => {
      (goalsRepo.getGoalsbyGoalID as any).mockResolvedValue({
        id: 'goal1',
        userId: 'otherUser',
      });

      await expect(getGoalProgressService('user1', 'goal1')).rejects.toThrow('Forbidden');
    });
  });
});
