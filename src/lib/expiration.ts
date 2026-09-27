export type ExpirationStatus = 'expired' | 'critical' | 'soon' | 'fresh';

export function getDaysUntilExpiration(expirationDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expirationDate);
  exp.setHours(0, 0, 0, 0);
  return Math.floor((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getExpirationStatus(expirationDate: string): ExpirationStatus {
  const days = getDaysUntilExpiration(expirationDate);
  if (days < 0) return 'expired';
  if (days <= 1) return 'critical';
  if (days <= 5) return 'soon';
  return 'fresh';
}

export function formatDate(expirationDate: string): string {
  const date = new Date(expirationDate);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatRelativeExpiration(expirationDate: string): string {
  const days = getDaysUntilExpiration(expirationDate);
  if (days < 0) return `Expired ${Math.abs(days)}d ago`;
  if (days === 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  if (days <= 7) return `Expires in ${days} days`;
  if (days <= 30) return `Expires in ${Math.ceil(days / 7)} weeks`;
  return `Expires in ${Math.ceil(days / 30)} months`;
}

export const expirationBadgeClasses: Record<ExpirationStatus, string> = {
  expired: 'bg-red-100 text-red-700 border-red-200',
  critical: 'bg-orange-100 text-orange-700 border-orange-200',
  soon: 'bg-amber-100 text-amber-700 border-amber-200',
  fresh: 'bg-brand-100 text-brand-700 border-brand-200',
};

export const expirationDotClasses: Record<ExpirationStatus, string> = {
  expired: 'bg-red-500',
  critical: 'bg-orange-500',
  soon: 'bg-amber-500',
  fresh: 'bg-brand-500',
};
