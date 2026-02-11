import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import type { WorkoutCardProps } from '@/types/goals.types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Flame, Dumbbell, Heart, PersonStanding } from 'lucide-react';

const exerciseTypeConfig: Record<string, { icon: any; color: string; bg: string }> = {
  cardio: {
    icon: PersonStanding,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-500/20',
  },
  strength: {
    icon: Dumbbell,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-500/20',
  },
  flexibility: {
    icon: Heart,
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-500/20',
  },
  sports: {
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-500/20',
  },
  other: {
    icon: Flame,
    color: 'text-primary',
    bg: 'bg-primary/20',
  },
};

export function WorkoutCard({ workout, onEdit, onDelete }: WorkoutCardProps) {
  const typeKey = workout.exerciseType.toLowerCase();
  const config = exerciseTypeConfig[typeKey] || exerciseTypeConfig.other;
  const Icon = config.icon;

  return (
    <Card className="bg-white dark:bg-white/5 border-border-light dark:border-white/10 p-6 transition-all hover:shadow-lg hover:shadow-primary/5 relative group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', config.bg)}>
            <Icon className={cn('w-6 h-6', config.color)} />
          </div>
          <div>
            <h3 className="font-bold text-foreground">{workout.exerciseName}</h3>
            <span className={cn('text-[10px] font-bold uppercase', config.color)}>
              {workout.exerciseType}
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
            <DropdownMenuItem onClick={() => onEdit(workout)}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(workout)}
              className="text-red-500 focus:text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-background-light dark:bg-white/5 rounded-xl">
          <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Duration</p>
          <p className="text-lg font-bold text-foreground">
            {workout.duration} <span className="text-xs font-normal">min</span>
          </p>
        </div>
        <div className="p-3 bg-background-light dark:bg-white/5 rounded-xl">
          <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Calories</p>
          <p className="text-lg font-bold text-foreground">
            {workout.caloriesBurned} <span className="text-xs font-normal">kcal</span>
          </p>
        </div>
      </div>

      {workout.date && (
        <div className="mt-3 pt-3 border-t border-border-light dark:border-white/10">
          <p className="text-xs text-text-secondary">
            {format(new Date(workout.date), 'MMM dd, yyyy')}
          </p>
        </div>
      )}
    </Card>
  );
}
