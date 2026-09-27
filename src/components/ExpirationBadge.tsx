import { AlertTriangle, Calendar } from 'lucide-react';
import {
  getExpirationStatus,
  formatRelativeExpiration,
  expirationBadgeClasses,
  expirationDotClasses,
} from '@/lib/expiration';

type Props = {
  expirationDate: string;
  showIcon?: boolean;
  showRelative?: boolean;
};

export default function ExpirationBadge({
  expirationDate,
  showIcon = true,
  showRelative = true,
}: Props) {
  const status = getExpirationStatus(expirationDate);
  const label = showRelative
    ? formatRelativeExpiration(expirationDate)
    : null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${expirationBadgeClasses[status]}`}
    >
      {showIcon && (
        <span className={`h-1.5 w-1.5 rounded-full ${expirationDotClasses[status]}`} />
      )}
      {status === 'expired' && <AlertTriangle className="h-3 w-3" />}
      {status !== 'expired' && showIcon && <Calendar className="h-3 w-3" />}
      {label}
    </span>
  );
}
