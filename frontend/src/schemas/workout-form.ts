import * as z from 'zod';
export const workoutFormSchema = z.object({
  exerciseType: z.string().min(1, 'Exercise type is required'),
  exerciseName: z.string().min(1, 'Exercise name is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  caloriesBurned: z.number().min(0, 'Calories must be 0 or greater'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});
