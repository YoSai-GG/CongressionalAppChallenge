import type { ReactNode } from 'react';

type Props = {
  label: string;
  value: string | number;
  icon: ReactNode;
  accent?: 'brand' | 'amber' | 'red' | 'blue';
  sublabel?: string;
};

const accentClasses = {
  brand: 'bg-brand-50 text-brand-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  blue: 'bg-blue-50 text-blue-600',
};

export default function StatCard({ label, value, icon, accent = 'brand', sublabel }: Props) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{value}</p>
          {sublabel && <p className="mt-0.5 text-xs text-stone-400">{sublabel}</p>}
        </div>
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
          {icon}
        </span>
      </div>
    </div>
  );
}
