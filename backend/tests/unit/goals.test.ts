import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createGoalsService,
  getGoalsService,
  findGoalsbyIDService,
  updateUserGoalService,
  deleteUserGoalService,
} from '../../src/services/goal.service';

import * as goalRepo from '../../src/repositories/goals.repository';
import { AppError } from '../../src/utils/error';

// Mock repository
vi.mock('../../src/repositories/goals.repository');

describe('Goals Service - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // CREATE GOAL

  describe('createGoalsService', () => {
    it('should throw 401 if userId is missing', async () => {
      await expect(createGoalsService('', {} as any)).rejects.toThrow(AppError);
    });

    it('should throw if goalType or startDate missing', async () => {
      await expect(
        createGoalsService('user1', {
          targetValue: 100,
        } as any),
      ).rejects.toThrow('Goal type and start date are required');
    });

    it('should throw if targetValue <= 0', async () => {
      await expect(
        createGoalsService('user1', {
          goalType: 'calories',
          startDate: new Date(),
          endDate: new Date(Date.now() + 1000),
          targetValue: 0,
        } as any),
      ).rejects.toThrow('Target value must be greater than zero');
    });

    it('should throw if endDate missing', async () => {
      await expect(
        createGoalsService('user1', {
          goalType: 'calories',
          startDate: new Date(),
          targetValue: 100,
        } as any),
      ).rejects.toThrow('End date is required');
    });

    it('should throw if endDate <= startDate', async () => {
      const now = new Date();

      await expect(
        createGoalsService('user1', {
          goalType: 'calories',
          startDate: now,
          endDate: now,
          targetValue: 100,
        } as any),
      ).rejects.toThrow('End date must be after start date');
    });

    it('should call repository and create goal', async () => {
      const mockGoal = { id: 'goal1' };

      (goalRepo.createGoal as any).mockResolvedValue(mockGoal);

      const result = await createGoalsService('user1', {
        goalType: 'calories',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        targetValue: 100,
        currentValue: 0,
      } as any);

      expect(goalRepo.createGoal).toHaveBeenCalled();
      expect(result).toEqual(mockGoal);
    });
  });

  // GET GOALS

  describe('getGoalsService', () => {
    it('should throw if userId missing', async () => {
      await expect(getGoalsService({ userId: '' } as any)).rejects.toThrow('User ID is required');
    });

    it('should return paginated goals', async () => {
      (goalRepo.getGoalbyUserID as any).mockResolvedValue({
        count: 20,
        rows: [{ id: 'goal1' }],
      });

      const result = await getGoalsService({
        userId: 'user1',
        page: 1,
        limit: 10,
      });

      expect(result.goals.length).toBe(1);
      expect(result.pagination.totalPages).toBe(2);
      expect(result.pagination.totalItems).toBe(20);
    });
  });

  // FIND GOAL BY ID

  describe('findGoalsbyIDService', () => {
    it('should throw 401 if userId missing', async () => {
      await expect(findGoalsbyIDService('', 'goal1')).rejects.toThrow('Unauthorized');
    });

    it('should throw 400 if goalId missing', async () => {
      await expect(findGoalsbyIDService('user1', '')).rejects.toThrow('Goal ID is required');
    });

    it('should throw 404 if goal not found', async () => {
      (goalRepo.getGoalsbyGoalID as any).mockResolvedValue(null);

      await expect(findGoalsbyIDService('user1', 'goal1')).rejects.toThrow('Goal not found');
    });

    it('should throw 403 if goal belongs to another user', async () => {
      (goalRepo.getGoalsbyGoalID as any).mockResolvedValue({
        id: 'goal1',
        userId: 'user2',
      });

      await expect(findGoalsbyIDService('user1', 'goal1')).rejects.toThrow('Forbidden');
    });

    it('should return goal if valid', async () => {
      const mockGoal = { id: 'goal1', userId: 'user1' };

      (goalRepo.getGoalsbyGoalID as any).mockResolvedValue(mockGoal);

      const result = await findGoalsbyIDService('user1', 'goal1');

      expect(result).toEqual(mockGoal);
    });
  });

  // UPDATE GOAL

  describe('updateUserGoalService', () => {
    it('should throw if payload empty', async () => {
      await expect(updateUserGoalService('user1', 'goal1', {})).rejects.toThrow(
        'No fields provided to update',
      );
    });

    it('should throw if targetValue <= 0', async () => {
      await expect(
        updateUserGoalService('user1', 'goal1', {
          targetValue: 0,
        }),
      ).rejects.toThrow('Target value must be greater than zero');
    });

    it('should throw if currentValue negative', async () => {
      await expect(
        updateUserGoalService('user1', 'goal1', {
          currentValue: -5,
        }),
      ).rejects.toThrow('Current value cannot be negative');
    });

    it('should update goal successfully', async () => {
      const mockGoal = { id: 'goal1', userId: 'user1' };

      vi.spyOn(goalRepo, 'getGoalsbyGoalID').mockResolvedValue(mockGoal as any);
      vi.spyOn(goalRepo, 'updateGoal').mockResolvedValue({
        ...mockGoal,
        currentValue: 50,
      } as any);

      const result = await updateUserGoalService('user1', 'goal1', {
        currentValue: 50,
      });

      expect(goalRepo.updateGoal).toHaveBeenCalled();
      expect(result.currentValue).toBe(50);
    });
  });

  // DELETE GOAL

  describe('deleteUserGoalService', () => {
    it('should delete goal successfully', async () => {
      const mockGoal = { id: 'goal1', userId: 'user1' };

      vi.spyOn(goalRepo, 'getGoalsbyGoalID').mockResolvedValue(mockGoal as any);
      vi.spyOn(goalRepo, 'deleteGoal').mockResolvedValue(undefined);

      await deleteUserGoalService('user1', 'goal1');

      expect(goalRepo.deleteGoal).toHaveBeenCalled();
    });
  });
});
