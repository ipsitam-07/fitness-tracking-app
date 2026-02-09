import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    label: string;
  };
  color: 'orange' | 'blue' | 'primary' | 'red' | 'purple' | 'green';
  chartType?: 'progress' | 'bars' | 'area';
  chartData?: any[];
  className?: string;
}

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

export function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  color,
  chartType = 'progress',
  chartData,
  className,
}: StatCardProps) {
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

      {/* Chart Section */}
      <div className="mt-auto h-8">
        {chartType === 'progress' && trend && (
          <div className="w-full flex items-end gap-1">
            <div className={cn('flex-grow h-3 rounded-full overflow-hidden', styles.trendBg)}>
              <div
                className={cn('h-full', styles.trendFill)}
                style={{ width: `${trend.value}%` }}
              />
            </div>
            <span className={cn('text-[10px] font-bold', styles.trendText)}>{trend.value}%</span>
          </div>
        )}

        {chartType === 'bars' && chartData && (
          <ResponsiveContainer width="100%" height={32}>
            <BarChart data={chartData}>
              <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === chartData.length - 1 ? styles.chartColor : `${styles.chartColor}66`
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'area' && chartData && (
          <ResponsiveContainer width="100%" height={32}>
            <AreaChart data={chartData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={styles.chartColor}
                strokeWidth={2}
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
