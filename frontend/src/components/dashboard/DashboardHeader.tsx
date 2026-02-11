import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DASHBOARD_HEADER } from '@/utils/constants';
import { Bell, Search } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  onSearch?: (query: string) => void;
}

export function DashboardHeader({ userName, onSearch }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {DASHBOARD_HEADER.GREETINGS}, {userName}!
        </h2>
        <p className="text-text-secondary text-sm">{DASHBOARD_HEADER.WELCOME_TEXT}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
          <Input
            type="text"
            placeholder="Search activities..."
            className="pl-10 pr-4 py-2 bg-white dark:bg-white/5 border-border-light dark:border-white/10 rounded-lg text-sm w-64"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
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
