import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MoreVertical, Target, TrendingUp, Calendar, Flame } from 'lucide-react';
import type { Goal } from '@/types/goals.types';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  showProgress?: boolean;
}

const goalTypeConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  weight: {
    icon: Target,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-500/20',
    label: 'Weight',
  },
  workout_count: {
    icon: Flame,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-500/20',
    label: 'Workout Count',
  },
  calories: {
    icon: TrendingUp,
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-500/20',
    label: 'Calories',
  },
  duration: {
    icon: Calendar,
    color: 'text-primary',
    bg: 'bg-primary/20',
    label: 'Duration',
  },
};

export function GoalCard({ goal, onEdit, onDelete, showProgress = true }: GoalCardProps) {
  const config = goalTypeConfig[goal.goalType] || goalTypeConfig.workout_count;
  const Icon = config.icon;

  const progress = Math.round((goal.currentValue / goal.targetValue) * 100);
  const daysLeft = goal.endDate ? differenceInDays(new Date(goal.endDate), new Date()) : 0;

  const getGoalUnit = () => {
    switch (goal.goalType) {
      case 'weight':
        return 'kg';
      case 'workout_count':
        return 'workouts';
      case 'calories':
        return 'kcal';
      case 'duration':
        return 'min';
      default:
        return '';
    }
  };

  const isCompleted = goal.status === 'completed';
  const isAbandoned = goal.status === 'abandoned';

  return (
    <Card
      className={cn(
        'bg-white dark:bg-white/5 border-border-light dark:border-white/10 p-6 transition-all hover:shadow-lg hover:shadow-primary/5 relative',
        isCompleted && 'border-primary/30',
        isAbandoned && 'opacity-60',
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', config.bg)}>
            <Icon className={cn('w-6 h-6', config.color)} />
          </div>
          <div>
            <h4 className="font-bold text-foreground">
              {goal.description || `${config.label} Goal`}
            </h4>
            <span className="text-[10px] font-bold text-text-secondary uppercase">
              {config.label}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-2 text-text-secondary hover:text-foreground transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(goal)}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(goal)}
              className="text-red-500 focus:text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showProgress && (
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Current</p>
              <p className="text-xl font-bold text-foreground">
                {goal.currentValue} <span className="text-xs font-normal">{getGoalUnit()}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Target</p>
              <p className="text-xl font-bold text-primary">
                {goal.targetValue} <span className="text-xs font-normal">{getGoalUnit()}</span>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Progress value={Math.min(progress, 100)} className="h-3" />
            <div className="flex justify-between items-center">
              <p className="text-xs text-center text-text-secondary font-medium">
                {progress}% achieved
              </p>
              {daysLeft > 0 && !isCompleted && (
                <p
                  className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-full inline-block',
                    config.color.replace('text-', 'text-'),
                    config.bg,
                  )}
                >
                  {daysLeft} days left
                </p>
              )}
              {isCompleted && (
                <p className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Completed
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {goal.startDate && goal.endDate && (
        <div className="mt-4 pt-4 border-t border-border-light dark:border-white/10">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Start: {format(new Date(goal.startDate), 'MMM dd, yyyy')}</span>
            <span>End: {format(new Date(goal.endDate), 'MMM dd, yyyy')}</span>
          </div>
        </div>
      )}
    </Card>
  );
}
