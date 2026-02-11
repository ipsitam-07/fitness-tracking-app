import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlusCircle } from 'lucide-react';
import type { Goal } from '@/types/goals.types';
import type { ActiveGoalsProps } from '@/types/goals.types';
import { ACTIVE_GOALS } from '@/utils/constants';

export function ActiveGoals({ goals, onAddGoal, onViewAll }: ActiveGoalsProps) {
  const getGoalProgress = (goal: Goal) => {
    return Math.round((goal.currentValue / goal.targetValue) * 100);
  };

  const getGoalDescription = (goal: Goal) => {
    switch (goal.goalType) {
      case 'weight':
        return `Target: ${goal.targetValue}kg • Current: ${goal.currentValue}kg`;
      case 'workout_count':
        return `Target: ${goal.targetValue} workouts`;
      case 'calories':
        return `Target: ${goal.targetValue} calories`;
      case 'duration':
        return `Target: ${goal.targetValue} minutes`;
      default:
        return goal.description || '';
    }
  };

  return (
    <Card className="bg-white dark:bg-white/5 border-border-light dark:border-white/10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-foreground">{ACTIVE_GOALS.HEADER}</h3>
        <Button
          variant="link"
          className="text-primary text-xs font-bold hover:underline p-0 h-auto"
          onClick={onViewAll}
        >
          {ACTIVE_GOALS.VIEW_ALL}
        </Button>
      </div>

      <div className="space-y-4">
        {goals.slice(0, 2).map((goal) => {
          const progress = getGoalProgress(goal);

          return (
            <div
              key={goal.id}
              className="p-4 rounded-xl bg-background-light dark:bg-white/5 border border-border-light dark:border-white/10"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-foreground">
                  {goal.description || goal.goalType}
                </span>
                <span className="text-xs font-bold text-primary">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-[10px] text-text-secondary mt-2">{getGoalDescription(goal)}</p>
            </div>
          );
        })}

        <Button
          variant="outline"
          className="w-full py-3 border-2 border-dashed border-border-light dark:border-white/10 rounded-xl text-text-secondary hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 text-sm font-semibold bg-transparent"
          onClick={onAddGoal}
        >
          <PlusCircle className="w-4 h-4" />
          {ACTIVE_GOALS.ADD_GOAL}
        </Button>
      </div>
    </Card>
  );
}
