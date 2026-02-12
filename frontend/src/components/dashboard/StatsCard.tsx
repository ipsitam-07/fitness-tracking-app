import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { StatCardProps } from '@/types/dashboard.types';

const colorStyles = {
  orange: {
    iconBg: 'bg-orange-100 dark:bg-orange-500/20 text-orange-500',
    trendBg: 'bg-orange-100 dark:bg-orange-500/10',
    trendFill: 'bg-orange-500',
    trendText: 'text-orange-500',
    chartColor: '#f97316',
  },
  blue: {
    iconBg: 'bg-blue-100 dark:bg-blue-500/20 text-blue-500',
    trendBg: 'bg-blue-100 dark:bg-blue-500/10',
    trendFill: 'bg-blue-500',
    trendText: 'text-blue-500',
    chartColor: '#3b82f6',
  },
  primary: {
    iconBg: 'bg-primary/20 text-primary',
    trendBg: 'bg-primary/10',
    trendFill: 'bg-primary',
    trendText: 'text-primary',
    chartColor: '#13ec80',
  },
  red: {
    iconBg: 'bg-red-100 dark:bg-red-500/20 text-red-500',
    trendBg: 'bg-red-100 dark:bg-red-500/10',
    trendFill: 'bg-red-500',
    trendText: 'text-red-500',
    chartColor: '#ef4444',
  },
  purple: {
    iconBg: 'bg-purple-100 dark:bg-purple-500/20 text-purple-500',
    trendBg: 'bg-purple-100 dark:bg-purple-500/10',
    trendFill: 'bg-purple-500',
    trendText: 'text-purple-500',
    chartColor: '#a855f7',
  },
  green: {
    iconBg: 'bg-green-100 dark:bg-green-500/20 text-green-500',
    trendBg: 'bg-green-100 dark:bg-green-500/10',
    trendFill: 'bg-green-500',
    trendText: 'text-green-500',
    chartColor: '#22c55e',
  },
};

export function StatsCard({ icon: Icon, label, value, color, className }: StatCardProps) {
  const styles = colorStyles[color];

  return (
    <Card
      className={cn(
        'bg-white dark:bg-white/5 border-border-light dark:border-white/10 p-6 flex flex-col',
        className,
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn('p-2 rounded-lg', styles.iconBg)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-text-secondary uppercase">{label}</span>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </Card>
  );
}
