import { useState } from 'react';
import { MoreVertical, PlusCircle, Target } from 'lucide-react';
import { toast } from 'sonner';
import { Sidebar } from '@/components/utils/SideBar';
import { GoalCard } from '@/components/goals/GoalCard';
import { GoalForm } from '@/components/goals/GoalForm';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGoals, useCreateGoal, useUpdateGoal, useDeleteGoal } from '@/hooks/useGoals';
import type { Goal } from '@/types/goals.types';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGoalForm, useGoalFilters } from '@/store/stores';

export default function GoalsPage() {
  const { isOpen, editingId, open, close } = useGoalForm();
  const { statusFilter, setStatusFilter } = useGoalFilters();
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);

  // Fetch goals based on active tab
  const { data: goalsData, isLoading } = useGoals({
    status: statusFilter === 'all' ? undefined : statusFilter,
    limit: 50,
  });

  const createGoalMutation = useCreateGoal();
  const updateGoalMutation = useUpdateGoal();
  const deleteGoalMutation = useDeleteGoal();

  const handleAddGoal = () => {
    open();
  };

  const handleEditGoal = (goal: Goal) => {
    open(goal.id);
  };

  const handleDeleteClick = (goal: Goal) => {
    setDeletingGoal(goal);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingId) {
        await updateGoalMutation.mutateAsync({
          id: editingId,
          data,
        });
        toast.success('Goal updated successfully');
      } else {
        await createGoalMutation.mutateAsync(data);
        toast.success('Goal created successfully');
      }
      close();
    } catch (error) {
      toast.error('Failed to save goal', {
        description: 'Please try again.',
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingGoal) return;

    try {
      await deleteGoalMutation.mutateAsync(deletingGoal.id);
      toast.success('Goal deleted successfully');
      setDeletingGoal(null);
    } catch (error) {
      toast.error('Failed to delete goal', {
        description: 'Please try again.',
      });
    }
  };

  const goals = goalsData?.data || [];
  const activeGoals = goals.filter((g) => g.status === 'active');
  const completedGoals = goals.filter((g) => g.status === 'completed');

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar />

      <main className="grow h-full overflow-y-auto p-8 lg:p-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Goals</h2>
            <p className="text-text-secondary text-sm">
              Track your fitness objectives and milestones.
            </p>
          </div>
          <Button
            onClick={handleAddGoal}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <PlusCircle className="w-5 h-5" />
            Set New Goal
          </Button>
        </header>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border-light dark:border-white/10">
          <button
            onClick={() => setStatusFilter('active')}
            className={cn(
              'px-4 py-2 font-semibold text-sm transition-colors relative',
              statusFilter === 'active'
                ? 'text-primary'
                : 'text-text-secondary hover:text-foreground',
            )}
          >
            Active
            {statusFilter === 'active' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={cn(
              'px-4 py-2 font-semibold text-sm transition-colors relative',
              statusFilter === 'completed'
                ? 'text-primary'
                : 'text-text-secondary hover:text-foreground',
            )}
          >
            Completed
            {statusFilter === 'completed' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              'px-4 py-2 font-semibold text-sm transition-colors relative',
              statusFilter === 'all' ? 'text-primary' : 'text-text-secondary hover:text-foreground',
            )}
          >
            All
            {statusFilter === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Active Goals Section */}
        {statusFilter === 'active' && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Active Goals</h3>
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                {activeGoals.length} in progress
              </span>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-text-secondary">Loading goals...</p>
              </div>
            ) : activeGoals.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Target className="w-12 h-12 text-text-secondary" />
                <p className="text-text-secondary">No active goals</p>
                <Button onClick={handleAddGoal} variant="outline">
                  Set Your First Goal
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={handleEditGoal}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Completed Goals Section */}
        {statusFilter === 'completed' && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Completed Goals</h3>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-text-secondary">Loading goals...</p>
              </div>
            ) : completedGoals.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Target className="w-12 h-12 text-text-secondary" />
                <p className="text-text-secondary">No completed goals yet</p>
                <p className="text-sm text-text-secondary">Keep working on your active goals!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 border border-primary/30 dark:border-primary/20 rounded-2xl group hover:border-primary/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div className="grow">
                      <h5 className="font-bold text-foreground">
                        {goal.description || `${goal.goalType} Goal`}
                      </h5>
                      <p className="text-xs text-text-secondary">
                        Completed • {goal.targetValue} {goal.goalType === 'weight' ? 'kg' : ''}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-text-secondary hover:text-foreground"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditGoal(goal)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(goal)}
                          className="text-red-500 focus:text-red-500"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* All Goals Section */}
        {statusFilter === 'all' && (
          <section>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-text-secondary">Loading goals...</p>
              </div>
            ) : goals.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Target className="w-12 h-12 text-text-secondary" />
                <p className="text-text-secondary">No goals yet</p>
                <Button onClick={handleAddGoal} variant="outline">
                  Set Your First Goal
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={handleEditGoal}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Goal Form Modal */}
      <GoalForm
        open={isOpen}
        onClose={close}
        onSubmit={handleSubmit}
        goal={editingId ? goals.find((g) => g.id === editingId) || null : null}
        isLoading={createGoalMutation.isPending || updateGoalMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingGoal} onOpenChange={() => setDeletingGoal(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingGoal?.description || 'this goal'}". This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteGoalMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
