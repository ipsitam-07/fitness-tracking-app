import { Sidebar } from '@/components/utils/SideBar';
import { StatCard } from '@/components/dashboard/StatsCard';

import { Flame, Footprints, Zap, Heart } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <div className="h-screen flex overflow-hidden bg-white">
        <Sidebar />

        <main className="grow h-full overflow-y-auto p-8 lg:p-10">
          <header className="mb-10">
            <h2 className="text-2xl font-bold">Good morning 👋</h2>
            <p className="text-text-muted">Here's what's happening with your fitness today.</p>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard icon={<Flame />} label="Calories" value="1840" />
            <StatCard icon={<Footprints />} label="Steps" value="8,432" />
            <StatCard icon={<Zap />} label="Active Minutes" value="45 min" />
            <StatCard icon={<Heart />} label="Heart Rate" value="72 bpm" />
          </section>
        </main>
      </div>
    </>
  );
}
