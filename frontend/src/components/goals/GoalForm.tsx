import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Goal } from '@/types/goals.types';
import { goalFormSchema } from '@/schemas/goal-form';
import type { GoalFormValues } from '@/types/goals.types';

interface GoalFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormValues) => void;
  goal?: Goal | null;
  isLoading?: boolean;
}

const goalTypes = [
  { value: 'workout_count', label: 'Workout Count', unit: 'workouts' },
  { value: 'weight', label: 'Weight', unit: 'kg' },
  { value: 'calories', label: 'Calories', unit: 'kcal' },
  { value: 'duration', label: 'Duration', unit: 'minutes' },
] as const;

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'abandoned', label: 'Abandoned' },
] as const;

export function GoalForm({ open, onClose, onSubmit, goal, isLoading = false }: GoalFormProps) {
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      goalType: 'workout_count',
      targetValue: 0,
      currentValue: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      status: 'active',
      description: '',
    },
  });

  useEffect(() => {
    if (goal) {
      form.reset({
        goalType: goal.goalType as 'workout_count' | 'weight' | 'calories' | 'duration',
        targetValue: goal.targetValue,
        currentValue: goal.currentValue,
        startDate: goal.startDate
          ? new Date(goal.startDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        endDate: goal.endDate
          ? new Date(goal.endDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        status: goal.status as 'active' | 'completed' | 'abandoned',
        description: goal.description || '',
      });
    } else {
      form.reset({
        goalType: 'workout_count',
        targetValue: 0,
        currentValue: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        status: 'active',
        description: '',
      });
    }
  }, [goal, form]);

  const handleSubmit = (data: GoalFormValues) => {
    onSubmit(data);
    form.reset();
  };

  const selectedGoalType = form.watch('goalType');
  const unit = goalTypes.find((t) => t.value === selectedGoalType)?.unit || '';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>{goal ? 'Edit Goal' : 'Set New Goal'}</DialogTitle>
          <DialogDescription>
            {goal
              ? 'Update your goal details below.'
              : 'Define your fitness goal and track your progress.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="goalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {goalTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Lose 5kg for summer"
                      {...field}
                      className="mt-1 flex h-11 w-full items-center justify-between whitespace-nowrap rounded-xl border border-border-light dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Value ({unit})</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="mt-1 flex h-11 w-full items-center justify-between whitespace-nowrap rounded-xl border border-border-light dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Value ({unit})</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="20"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="mt-1 flex h-11 w-full items-center justify-between whitespace-nowrap rounded-xl border border-border-light dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="mt-1 flex h-11 w-full items-center justify-between whitespace-nowrap rounded-xl border border-border-light dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="mt-1 flex h-11 w-full items-center justify-between whitespace-nowrap rounded-xl border border-border-light dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {goal && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : goal ? 'Update Goal' : 'Set Goal'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
