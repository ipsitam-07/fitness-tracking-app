import { z } from 'zod';
import { GoalType, GoalStatus } from '../enums/goals';

export const createGoalSchema = z.object({
  body: z.object({
    goalType: z.enum(GoalType),

    targetValue: z.number().min(0, 'Target value must be >= 0'),

    currentValue: z.number().min(0, 'Current value must be >= 0').optional(),

    startingValue: z.number().min(0, 'Starting value must be >= 0').optional(),

    startDate: z.coerce.date(),

    endDate: z.coerce
      .date()
      .refine((date) => date > new Date(), { message: 'End date must be in the future' }),

    description: z.string().max(1000, 'Description too long').optional(),
  }),
});

export const updateGoalSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid goal ID'),
  }),

  body: z
    .object({
      targetValue: z.number().min(0, 'Target value must be >= 0').optional(),

      currentValue: z.number().min(0, 'Current value must be >= 0').optional(),

      startingValue: z.number().min(0, 'Starting value must be >= 0').optional(),

      endDate: z.coerce.date().optional(),

      status: z.nativeEnum(GoalStatus).optional(),

      description: z.string().max(1000, 'Description too long').optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
    }),
});
