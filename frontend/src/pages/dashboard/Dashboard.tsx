import { Flame, Zap, Heart } from 'lucide-react';
import { Sidebar } from '@/components/utils/SideBar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { WeeklyActivity } from '@/components/dashboard/WeeklyActivity';
import { ActiveGoals } from '@/components/dashboard/ActiveGoals';
import { RecentWorkouts } from '@/components/dashboard/RecentWorkout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDashboardStats, useDailyWorkouts } from '@/hooks/useDashboardStats';
import { useGoals } from '@/hooks/useGoals';

import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();

  const { data: dashboardResponse, isLoading: isLoadingStats } = useDashboardStats();
  const { data: goalsData } = useGoals({ status: 'active', limit: 3 });
  const { data: dailyWorkoutsData } = useDailyWorkouts();

  const dashboardStats = dashboardResponse?.result;

  const getWeeklyChartData = () => {
    if (!dailyWorkoutsData) {
      return [
        { day: 'Mon', value: 0, isActive: false },
        { day: 'Tue', value: 0, isActive: false },
        { day: 'Wed', value: 0, isActive: false },
        { day: 'Thu', value: 0, isActive: false },
        { day: 'Fri', value: 0, isActive: false },
        { day: 'Sat', value: 0, isActive: false },
        { day: 'Sun', value: 0, isActive: false },
      ];
    }
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const { dailyCounts } = dailyWorkoutsData;
    return [
      { day: 'Mon', value: dailyCounts.Monday, isActive: today === 1 },
      { day: 'Tue', value: dailyCounts.Tuesday, isActive: today === 2 },
      { day: 'Wed', value: dailyCounts.Wednesday, isActive: today === 3 },
      { day: 'Thu', value: dailyCounts.Thursday, isActive: today === 4 },
      { day: 'Fri', value: dailyCounts.Friday, isActive: today === 5 },
      { day: 'Sat', value: dailyCounts.Saturday, isActive: today === 6 },
      { day: 'Sun', value: dailyCounts.Sunday, isActive: today === 0 },
    ];
  };

  const weeklyData = getWeeklyChartData();

  // Calculate progress
  if (isLoadingStats) {
    return (
      <div className="flex h-screen bg-background-light dark:bg-background-dark">
        <Sidebar />
        <main className="grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-text-secondary">Loading your dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar />

      <main className="grow h-full overflow-y-auto p-8 lg:p-10">
        <DashboardHeader userName={user?.name || 'User'} />

        {/* Stats Cards with Recharts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={Flame}
            label="Weekly Calories"
            value={dashboardStats?.thisWeek.calories || 0}
            color="orange"
          />

          <StatsCard
            icon={Zap}
            label="Active Minutes"
            value={dashboardStats?.thisWeek.duration || 0}
            color="primary"
          />

          <StatsCard
            icon={Flame}
            label="Longest Streak"
            value={dashboardStats?.longestStreak ?? 0}
            color="purple"
          />
        </div>

        {/* Weekly Activity & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <WeeklyActivity data={weeklyData} />
          </div>

          <ActiveGoals
            goals={goalsData?.data || []}
            onAddGoal={() => navigate('/goals')}
            onViewAll={() => navigate('/goals')}
          />
        </div>

        {/* Recent Workouts - Navigate to workout page for CRUD */}
        <RecentWorkouts
          workouts={dashboardStats?.recentWorkouts || []}
          onLogWorkout={() => navigate('/workout')}
          onLoadMore={() => navigate('/workout')}
          hasMore={(dashboardStats?.recentWorkouts?.length || 0) >= 5}
        />

        {/* Additional Stats */}
        {dashboardStats && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-white/5 border border-border-light dark:border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-semibold">Current Streak</p>
                  <p className="text-2xl font-bold text-foreground">
                    {dashboardStats.currentStreak} days
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-white/5 border border-border-light dark:border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-semibold">Total Workouts</p>
                  <p className="text-2xl font-bold text-foreground">
                    {dashboardStats.totalWorkouts}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-white/5 border border-border-light dark:border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-semibold">Active Goals</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.activeGoals}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
