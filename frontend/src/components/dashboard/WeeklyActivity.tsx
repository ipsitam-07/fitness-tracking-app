import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface WeeklyActivityProps {
  data: Array<{
    day: string;
    value: number;
    isActive?: boolean;
  }>;
  onPeriodChange?: (period: string) => void;
}

export function WeeklyActivity({ data, onPeriodChange }: WeeklyActivityProps) {
  return (
    <Card className="bg-white dark:bg-white/5 border-border-light dark:border-white/10 p-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-foreground">Weekly Activity</h3>
        <Select defaultValue="this-week" onValueChange={onPeriodChange}>
          <SelectTrigger className="w-[140px] border-none bg-transparent text-sm font-semibold text-text-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#dbe6e0" opacity={0.3} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#618975', fontSize: 12, fontWeight: 700 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#618975', fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: 'rgba(19, 236, 128, 0.1)' }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #dbe6e0',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#111814', fontWeight: 600 }}
            itemStyle={{ color: '#13ec80' }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isActive ? '#13ec80' : 'rgba(19, 236, 128, 0.2)'}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
