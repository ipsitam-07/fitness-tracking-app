import { useState } from 'react';
import { Plus, PlusCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Sidebar } from '@/components/utils/SideBar';
import { WorkoutCard } from '@/components/workouts/WorkoutCard';
import { WorkoutForm } from '@/components/workouts/WorkoutForm';
import { Input } from '@/components/ui/input';
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
import {
  useWorkouts,
  useCreateWorkout,
  useUpdateWorkout,
  useDeleteWorkout,
} from '@/hooks/useWorkouts';
import type { Workout } from '@/types/workout.types';
import { cn } from '@/lib/utils';

const exerciseFilters = [
  { label: 'All', value: '' },
  { label: 'Cardio', value: 'cardio' },
  { label: 'Strength', value: 'strength' },
  { label: 'Flexibility', value: 'flexibility' },
  { label: 'Sports', value: 'sports' },
  { label: 'Other', value: 'other' },
];

export default function WorkoutsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [deletingWorkout, setDeletingWorkout] = useState<Workout | null>(null);

  // Fetch workouts with filters
  const { data: workoutsData, isLoading } = useWorkouts({
    search: searchQuery,
    limit: 50,
  } as any);

  const createWorkoutMutation = useCreateWorkout();
  const updateWorkoutMutation = useUpdateWorkout();
  const deleteWorkoutMutation = useDeleteWorkout();

  const handleAddWorkout = () => {
    setEditingWorkout(null);
    setIsFormOpen(true);
  };

  const handleEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (workout: Workout) => {
    setDeletingWorkout(workout);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingWorkout) {
        await updateWorkoutMutation.mutateAsync({
          id: editingWorkout.id,
          data,
        });
        toast.success('Workout updated successfully');
      } else {
        await createWorkoutMutation.mutateAsync(data);
        toast.success('Workout created successfully');
      }
      setIsFormOpen(false);
      setEditingWorkout(null);
    } catch (error) {
      toast.error('Failed to save workout', {
        description: 'Please try again.',
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingWorkout) return;

    try {
      await deleteWorkoutMutation.mutateAsync(deletingWorkout.id);
      toast.success('Workout deleted successfully');
      setDeletingWorkout(null);
    } catch (error) {
      toast.error('Failed to delete workout', {
        description: 'Please try again.',
      });
    }
  };

  // Filter workouts by type on the client side
  const allWorkouts = workoutsData?.data || [];
  const workouts = selectedType
    ? allWorkouts.filter((w) => w.exerciseType === selectedType)
    : allWorkouts;

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar />

      <main className="flex-grow h-full overflow-y-auto p-8 lg:p-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Workouts</h2>
            <p className="text-text-secondary text-sm">Manage and track your exercise routines.</p>
          </div>
          <Button
            onClick={handleAddWorkout}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            Add Workout
          </Button>
        </header>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/5 border-border-light dark:border-white/10 rounded-xl"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {exerciseFilters.map((filter) => (
              <Button
                key={filter.value}
                onClick={() => setSelectedType(filter.value)}
                className={cn(
                  'px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all',
                  selectedType === filter.value
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'bg-white dark:bg-white/5 text-muted-foreground border border-border-light dark:border-white/10 hover:border-primary/40 hover:text-primary',
                )}
                variant="outline"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Workouts Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-text-secondary">Loading workouts...</p>
          </div>
        ) : workouts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="text-text-secondary">
              {selectedType || searchQuery ? 'No workouts match your filters' : 'No workouts found'}
            </p>
            <Button
              onClick={handleAddWorkout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Your First Workout
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onEdit={handleEditWorkout}
                onDelete={handleDeleteClick}
              />
            ))}

            {/* Add New Card */}
            <button
              onClick={handleAddWorkout}
              className="bg-white dark:bg-white/5 border-2 border-dashed border-border-light dark:border-white/10 hover:border-primary rounded-2xl p-6 flex flex-col items-center justify-center gap-3 min-h-[200px] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors">
                <PlusCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-text-secondary group-hover:text-primary">
                Add New Workout
              </span>
            </button>
          </div>
        )}
      </main>

      {/* Workout Form Modal */}
      <WorkoutForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingWorkout(null);
        }}
        onSubmit={handleSubmit}
        workout={editingWorkout}
        isLoading={createWorkoutMutation.isPending || updateWorkoutMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingWorkout} onOpenChange={() => setDeletingWorkout(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingWorkout?.exerciseName}". This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteWorkoutMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
