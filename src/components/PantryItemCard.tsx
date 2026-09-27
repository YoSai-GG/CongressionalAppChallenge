import Link from 'next/link';
import { Pencil, Trash2, MapPin } from 'lucide-react';
import type { PantryItem } from '@/data/mock-data';
import ExpirationBadge from './ExpirationBadge';
import { formatDate } from '@/lib/expiration';

type Props = {
  item: PantryItem;
  onEdit?: (item: PantryItem) => void;
  onDelete?: (id: string) => void;
};

export default function PantryItemCard({ item, onEdit, onDelete }: Props) {
  return (
    <div className="card group p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-stone-900">{item.name}</h3>
          <p className="mt-0.5 text-sm text-stone-500">
            {item.quantity} {item.unit}
          </p>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-brand-50 hover:text-brand-600"
                title="Edit ingredient"
                aria-label={`Edit ${item.name}`}
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item.id)}
                className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600"
                title="Delete ingredient"
                aria-label={`Delete ${item.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {item.category && (
          <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
            {item.category}
          </span>
        )}
        <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-600">
          <MapPin className="h-3 w-3" />
          {item.location}
        </span>
        <ExpirationBadge expirationDate={item.expirationDate} />
      </div>
      <p className="mt-3 text-xs text-stone-400">Expires {formatDate(item.expirationDate)}</p>
    </div>
  );
}
