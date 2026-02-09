import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Flame, Dumbbell, Waves, Heart, PersonStanding } from 'lucide-react';
import type { Workout } from '@/types/workout.types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RecentWorkoutsProps {
  workouts: Workout[];
  onLogWorkout?: () => void;
  onLoadMore?: () => void;
  onEdit?: (workout: Workout) => void;
  onDelete?: (workout: Workout) => void;
  hasMore?: boolean;
}

const exerciseIcons: Record<string, { icon: any; color: string; bg: string }> = {
  cardio: {
    icon: PersonStanding,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  strength: {
    icon: Dumbbell,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  swimming: {
    icon: Waves,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  yoga: {
    icon: Heart,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  default: {
    icon: Flame,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
};

export function RecentWorkouts({
  workouts,
  onLogWorkout,
  onLoadMore,
  onEdit,
  onDelete,
  hasMore = false,
}: RecentWorkoutsProps) {
  const getExerciseIcon = (type: string) => {
    const normalized = type.toLowerCase();
    return exerciseIcons[normalized] || exerciseIcons.default;
  };

  return (
    <Card className="bg-white dark:bg-white/5 border-border-light dark:border-white/10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-foreground">Recent Workouts</h3>
        <Button
          onClick={onLogWorkout}
          className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Log Workout
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-light dark:border-white/10 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold text-text-secondary uppercase">
                Type
              </TableHead>
              <TableHead className="text-[10px] font-bold text-text-secondary uppercase">
                Duration
              </TableHead>
              <TableHead className="text-[10px] font-bold text-text-secondary uppercase">
                Calories
              </TableHead>
              <TableHead className="text-[10px] font-bold text-text-secondary uppercase">
                Date
              </TableHead>
              <TableHead className="text-[10px] font-bold text-text-secondary uppercase text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts.map((workout) => {
              const iconConfig = getExerciseIcon(workout.exerciseType);
              const Icon = iconConfig.icon;

              return (
                <TableRow
                  key={workout.id}
                  className="border-b border-border-light/50 dark:border-white/5 hover:bg-background-light dark:hover:bg-white/5"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center',
                          iconConfig.bg,
                        )}
                      >
                        <Icon className={cn('w-4 h-4', iconConfig.color)} />
                      </div>
                      <span className="font-semibold text-foreground">{workout.exerciseName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-secondary">{workout.duration} min</TableCell>
                  <TableCell className="text-text-secondary">
                    {workout.caloriesBurned} kcal
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {format(new Date(workout.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-text-secondary hover:text-primary"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(workout)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete?.(workout)}
                          className="text-red-500 focus:text-red-500"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={onLoadMore}
            className="text-text-secondary hover:text-foreground text-sm font-semibold"
          >
            Load more activities
          </Button>
        </div>
      )}
    </Card>
  );
}
