import { useNavigate } from 'react-router-dom';
import { SignupHeader } from '@/components/auth/SignupHeader';
import { Footer } from '@/components/auth/Footer';
import { TrendingDown, Dumbbell, Heart, Zap, Rocket, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import '../../index.css';

import { useCreateGoal } from '@/hooks/useGoals';
import type { GoalType } from '@/types/goals.types';
import { useAuthForms } from '@/store/stores';

type GoalOption = {
  id: GoalType;
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultTarget: number;
};

const goalOptions: GoalOption[] = [
  {
    id: 'workout_count',
    title: 'Count workout days',
    description: 'Keep a track of your workout consistency',
    icon: <TrendingDown className="text-primary" size={24} />,
    defaultTarget: 30,
  },
  {
    id: 'weight',
    title: 'Track Weight',
    description: 'Keep a track of your weight loss and gain',
    icon: <Dumbbell className="text-primary" size={24} />,
    defaultTarget: 70,
  },
  {
    id: 'calories',
    title: 'Count calories',
    description: 'Log your calorie count',
    icon: <Heart className="text-primary" size={24} />,
    defaultTarget: 2000,
  },
  {
    id: 'duration',
    title: 'Track active duration',
    description: 'Keep a track of your active movements',
    icon: <Zap className="text-primary" size={24} />,
    defaultTarget: 1800,
  },
];

function GoalsRegisterPage() {
  const navigate = useNavigate();
  const createGoal = useCreateGoal();

  const { onboardingGoal, setOnboardingGoal, resetForms } = useAuthForms();

  const handleFinish = async () => {
    const selectedGoalOption = goalOptions.find((g) => g.id === onboardingGoal);

    if (!selectedGoalOption) {
      toast.error('Please select a goal');
      return;
    }
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const payload = {
      goalType: onboardingGoal,
      targetValue: selectedGoalOption.defaultTarget,
      currentValue: 0,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: 'active' as const,
      description: `${selectedGoalOption.title} - Started ${startDate.toLocaleDateString()}`,
    };

    try {
      await createGoal.mutateAsync(payload);

      toast.success('Goal Created!', {
        description: 'Your fitness journey begins now!',
      });

      resetForms();

      // Navigate to login
      navigate('/login');
    } catch (error) {
      console.error('Failed to create goal:', error);

      toast.error('Failed to create goal', {
        description: error instanceof Error ? error.message : 'Please try again or skip this step.',
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const isLoading = createGoal.isPending;

  return (
    <>
      <div className="auth-bg">
        <SignupHeader />

        <main className="grow flex items-center justify-center p-6 bg-gradient-mesh">
          <div className="auth-card">
            {/* Progress Section */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Onboarding
                  </span>
                  <h3 className="text-foreground dark:text-white text-sm font-medium">
                    Step 2 of 2: Fitness Goals
                  </h3>
                </div>
                <span className="text-sm font-bold text-foreground dark:text-white">100%</span>
              </div>
              <div className="w-full bg-border-light dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-full rounded-full transition-all duration-500"></div>
              </div>
            </div>

            {/* Form Header */}
            <div className="mb-10 text-center">
              <h1 className="text-foreground dark:text-white text-3xl font-bold mb-3">
                What is your main goal?
              </h1>
              <p className="text-muted-foreground dark:text-gray-400 text-base">
                Select the primary objective you want to achieve in the next 30 days.
              </p>
            </div>

            {/* Goals Selection */}
            <RadioGroup
              value={onboardingGoal}
              onValueChange={(value) => setOnboardingGoal(value as GoalType)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
              disabled={isLoading}
            >
              {goalOptions.map((goal) => (
                <div key={goal.id} className="relative">
                  <RadioGroupItem
                    value={goal.id}
                    id={goal.id}
                    className="peer absolute opacity-0"
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor={goal.id}
                    className={`h-30 flex items-center gap-5 p-5 rounded-xl border-2 border-border bg-muted/50 cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-ring peer-data-[state=checked]:bg-primary/5 group ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="w-25 h-15 flex items-center justify-center bg-white dark:bg-white/10 rounded-lg shadow-sm transition-transform group-hover:scale-110">
                      {goal.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 font-bold text-foreground dark:text-white">
                        {goal.title}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground dark:text-gray-400">
                        {goal.description}
                      </span>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleFinish}
                disabled={isLoading}
                className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(19,236,128,0.4)] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Creating Goal...
                  </>
                ) : (
                  <>
                    Finish & Go to Login
                    <Rocket size={20} />
                  </>
                )}
              </Button>

              <div className="flex gap-3">
                <Button
                  onClick={handleBack}
                  disabled={isLoading}
                  variant="ghost"
                  className="flex-1 h-12 bg-transparent text-muted-foreground dark:text-gray-400 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-all disabled:opacity-50"
                >
                  <ArrowLeft size={18} />
                  Back
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default GoalsRegisterPage;
