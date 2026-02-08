import type { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
  footer?: ReactNode;
};

export function StatCard({ icon, label, value, footer }: Props) {
  return (
    <div className="stat-card">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg">{icon}</div>
        <div className="text-right">
          <span className="text-xs font-bold uppercase text-text-muted">{label}</span>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      {footer && <div className="mt-auto">{footer}</div>}
    </div>
  );
}
