import { z } from 'zod';
import { ExerciseType } from '../database/models/Workout';

const exerciseTypeEnum = z.enum(ExerciseType);

export const createWorkoutSchema = z.object({
  body: z.object({
    exerciseType: exerciseTypeEnum,

    exerciseName: z.string().min(1, 'Exercise name is required').max(100, 'Exercise name too long'),

    duration: z
      .number()
      .int('Duration must be an integer')
      .min(1, 'Duration must be at least 1 minute'),

    caloriesBurned: z
      .number()
      .int('Calories burned must be an integer')
      .min(0, 'Calories burned cannot be negative'),

    date: z.coerce.date(),

    notes: z.string().max(1000, 'Notes too long').optional(),
  }),
});

export const updateWorkoutSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid workout ID'),
  }),

  body: z
    .object({
      exerciseType: exerciseTypeEnum.optional(),

      exerciseName: z
        .string()
        .min(1, 'Exercise name cannot be empty')
        .max(100, 'Exercise name too long')
        .optional(),

      duration: z
        .number()
        .int('Duration must be an integer')
        .min(1, 'Duration must be at least 1 minute')
        .optional(),

      caloriesBurned: z
        .number()
        .int('Calories burned must be an integer')
        .min(0, 'Calories burned cannot be negative')
        .optional(),

      date: z.coerce.date().optional(),

      notes: z.string().max(1000, 'Notes too long').optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    }),
});
