import { Button } from '@/components/ui/button';
import { DASHBOARD_HEADER } from '@/utils/constants';
import { Bell } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {DASHBOARD_HEADER.GREETINGS}, {userName}!
        </h2>
        <p className="text-text-secondary text-sm">{DASHBOARD_HEADER.WELCOME_TEXT}</p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-lg border-border-light dark:border-white/10 bg-white dark:bg-white/5 text-text-secondary hover:text-primary"
        >
          <Bell className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
