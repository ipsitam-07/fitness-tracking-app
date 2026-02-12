import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createUserWorkoutService,
  getUserWorkoutsService,
  getWorkoutbyWorkoutIDService,
  updateWorkoutbyIDService,
  deleteWorkoutbyIDService,
} from '../../src/services/workout.service';

import * as workoutRepo from '../../src/repositories/workout.repository';

vi.mock('../../src/repositories/workout.repository');

describe('Workout Service - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // CREATE WORKOUT

  describe('createUserWorkoutService', () => {
    it('should throw if exerciseType or exerciseName missing', async () => {
      await expect(
        createUserWorkoutService('user1', {
          duration: 30,
          caloriesBurned: 100,
        } as any),
      ).rejects.toThrow('Exercise type and name are required');
    });

    it('should throw if duration <= 0', async () => {
      await expect(
        createUserWorkoutService('user1', {
          exerciseType: 'cardio',
          exerciseName: 'Running',
          duration: 0,
          caloriesBurned: 100,
        } as any),
      ).rejects.toThrow('Duration must be greater than 0');
    });

    it('should throw if caloriesBurned < 0', async () => {
      await expect(
        createUserWorkoutService('user1', {
          exerciseType: 'cardio',
          exerciseName: 'Running',
          duration: 30,
          caloriesBurned: -5,
        } as any),
      ).rejects.toThrow('Calories burned cannot be negative');
    });

    it('should call repository and create workout', async () => {
      const mockWorkout = { id: 'workout1' };

      (workoutRepo.createWorkout as any).mockResolvedValue(mockWorkout);

      const result = await createUserWorkoutService('user1', {
        exerciseType: 'cardio',
        exerciseName: 'Running',
        duration: 30,
        caloriesBurned: 100,
      } as any);

      expect(workoutRepo.createWorkout).toHaveBeenCalled();
      expect(result).toEqual(mockWorkout);
    });
  });

  // GET WORKOUTS

  describe('getUserWorkoutsService', () => {
    it('should throw if userId missing', async () => {
      await expect(getUserWorkoutsService({ userId: '' } as any)).rejects.toThrow(
        'User ID is required',
      );
    });

    it('should return paginated workouts', async () => {
      (workoutRepo.findWorkoutsByUserId as any).mockResolvedValue({
        count: 20,
        rows: [{ id: 'w1' }],
      });

      const result = await getUserWorkoutsService({
        userId: 'user1',
        page: 1,
        limit: 10,
      });

      expect(result.workouts.length).toBe(1);
      expect(result.pagination.totalPages).toBe(2);
      expect(result.pagination.totalItems).toBe(20);
    });
  });

  // GET WORKOUT BY ID

  describe('getWorkoutbyWorkoutIDService', () => {
    it('should throw 401 if userId missing', async () => {
      await expect(getWorkoutbyWorkoutIDService('workout1', '')).rejects.toThrow('Unauthorized');
    });

    it('should throw 400 if workoutId missing', async () => {
      await expect(getWorkoutbyWorkoutIDService('', 'user1')).rejects.toThrow(
        'Workout ID is required',
      );
    });

    it('should throw 404 if workout not found', async () => {
      (workoutRepo.findWorkoutbyWorkoutID as any).mockResolvedValue(null);

      await expect(getWorkoutbyWorkoutIDService('workout1', 'user1')).rejects.toThrow(
        'Workout not found',
      );
    });

    it('should throw 403 if workout belongs to another user', async () => {
      (workoutRepo.findWorkoutbyWorkoutID as any).mockResolvedValue({
        id: 'workout1',
        userId: 'user2',
      });

      await expect(getWorkoutbyWorkoutIDService('workout1', 'user1')).rejects.toThrow('Forbidden');
    });

    it('should return workout if valid', async () => {
      const mockWorkout = { id: 'workout1', userId: 'user1' };

      (workoutRepo.findWorkoutbyWorkoutID as any).mockResolvedValue(mockWorkout);

      const result = await getWorkoutbyWorkoutIDService('workout1', 'user1');

      expect(result).toEqual(mockWorkout);
    });
  });

  // UPDATE WORKOUT

  describe('updateWorkoutbyIDService', () => {
    it('should throw if payload empty', async () => {
      await expect(updateWorkoutbyIDService('workout1', 'user1', {})).rejects.toThrow(
        'No fields provided to update',
      );
    });

    it('should throw if duration <= 0', async () => {
      await expect(
        updateWorkoutbyIDService('workout1', 'user1', {
          duration: 0,
        }),
      ).rejects.toThrow('Duration must be greater than 0');
    });

    it('should throw if caloriesBurned < 0', async () => {
      await expect(
        updateWorkoutbyIDService('workout1', 'user1', {
          caloriesBurned: -5,
        }),
      ).rejects.toThrow('Calories burned cannot be negative');
    });

    it('should throw 404 if workout not found', async () => {
      (workoutRepo.findWorkoutbyWorkoutID as any).mockResolvedValue(null);

      await expect(
        updateWorkoutbyIDService('workout1', 'user1', {
          duration: 20,
        }),
      ).rejects.toThrow('Workout not found');
    });

    it('should throw 403 if workout belongs to another user', async () => {
      (workoutRepo.findWorkoutbyWorkoutID as any).mockResolvedValue({
        id: 'workout1',
        userId: 'user2',
      });

      await expect(
        updateWorkoutbyIDService('workout1', 'user1', {
          duration: 20,
        }),
      ).rejects.toThrow('Forbidden');
    });

    it('should update workout successfully', async () => {
      const mockWorkout = {
        id: 'workout1',
        userId: 'user1',
        update: vi.fn().mockResolvedValue(true),
      };

      (workoutRepo.findWorkoutbyWorkoutID as any).mockResolvedValue(mockWorkout);

      const result = await updateWorkoutbyIDService('workout1', 'user1', { duration: 45 });

      expect(mockWorkout.update).toHaveBeenCalled();
      expect(result).toEqual(mockWorkout);
    });
  });

  // DELETE WORKOUT

  describe('deleteWorkoutbyIDService', () => {
    it('should throw 401 if userId missing', async () => {
      await expect(deleteWorkoutbyIDService('workout1', '')).rejects.toThrow('Unauthorized');
    });

    it('should throw 400 if workoutId missing', async () => {
      await expect(deleteWorkoutbyIDService('', 'user1')).rejects.toThrow('Workout ID is required');
    });

    it('should throw 404 if workout not found', async () => {
      (workoutRepo.findWorkoutbyWorkoutID as any).mockResolvedValue(null);

      await expect(deleteWorkoutbyIDService('workout1', 'user1')).rejects.toThrow(
        'Workout not found',
      );
    });

    it('should throw 403 if workout belongs to another user', async () => {
      (workoutRepo.findWorkoutbyWorkoutID as any).mockResolvedValue({
        id: 'workout1',
        userId: 'user2',
      });

      await expect(deleteWorkoutbyIDService('workout1', 'user1')).rejects.toThrow('Forbidden');
    });

    it('should delete workout successfully', async () => {
      (workoutRepo.findWorkoutbyWorkoutID as any).mockResolvedValue({
        id: 'workout1',
        userId: 'user1',
      });

      (workoutRepo.deleteWorkoutbyID as any).mockResolvedValue(true);

      const result = await deleteWorkoutbyIDService('workout1', 'user1');

      expect(workoutRepo.deleteWorkoutbyID).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
});
