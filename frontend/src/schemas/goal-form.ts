import * as z from 'zod';

export const goalFormSchema = z.object({
  goalType: z.enum(['workout_count', 'weight', 'calories', 'duration'], {
    message: 'Please select a goal type',
  }),
  targetValue: z.number().min(1, 'Target value must be greater than 0'),
  currentValue: z.number().min(0, 'Current value must be 0 or greater'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  status: z.enum(['active', 'completed', 'abandoned']),
  description: z.string().optional(),
});
