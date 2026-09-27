import Link from 'next/link';
import { AlertTriangle, CalendarClock, ChefHat, ArrowRight, Package } from 'lucide-react';
import { pantryItems, recipes } from '@/data/mock-data';
import {
  getDaysUntilExpiration,
  getExpirationStatus,
  formatRelativeExpiration,
  formatDate,
  expirationBadgeClasses,
} from '@/lib/expiration';
import StatCard from '@/components/StatCard';

export default function ExpirationPage() {
  const sorted = [...pantryItems].sort(
    (a, b) => getDaysUntilExpiration(a.expirationDate) - getDaysUntilExpiration(b.expirationDate)
  );

  const expired = sorted.filter((i) => getExpirationStatus(i.expirationDate) === 'expired');
  const critical = sorted.filter((i) => getExpirationStatus(i.expirationDate) === 'critical');
  const soon = sorted.filter((i) => getExpirationStatus(i.expirationDate) === 'soon');
  const fresh = sorted.filter((i) => getExpirationStatus(i.expirationDate) === 'fresh');

  const getRecipeForItem = (itemId: string) => {
    const matched = recipes
      .filter((r) => r.matchedPantryItems?.includes(itemId))
      .sort((a, b) => (b.matchedPantryItems?.length ?? 0) - (a.matchedPantryItems?.length ?? 0));
    return matched[0] ?? null;
  };

  const sections = [
    { title: 'Expired', items: expired, icon: <AlertTriangle className="h-5 w-5" />, accent: 'text-red-600' },
    { title: 'Critical — Expires Today or Tomorrow', items: critical, icon: <CalendarClock className="h-5 w-5" />, accent: 'text-orange-600' },
    { title: 'Expiring Soon — Within 5 Days', items: soon, icon: <CalendarClock className="h-5 w-5" />, accent: 'text-amber-600' },
    { title: 'Fresh — More Than 5 Days', items: fresh, icon: <Package className="h-5 w-5" />, accent: 'text-brand-600' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Expiration Tracker</h1>
        <p className="mt-1 text-stone-500">
          Monitor everything approaching its expiration date and cook it before it goes bad.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Expired" value={expired.length} icon={<AlertTriangle className="h-6 w-6" />} accent="red" />
        <StatCard label="Critical" value={critical.length} sublabel="Today or tomorrow" icon={<CalendarClock className="h-6 w-6" />} accent="amber" />
        <StatCard label="Expiring Soon" value={soon.length} sublabel="Within 5 days" icon={<CalendarClock className="h-6 w-6" />} accent="amber" />
        <StatCard label="Fresh" value={fresh.length} sublabel="Good to go" icon={<Package className="h-6 w-6" />} accent="brand" />
      </div>

      {/* Sections */}
      <div className="mt-10 space-y-10">
        {sections.map((section) =>
          section.items.length === 0 ? null : (
            <section key={section.title}>
              <div className={`mb-4 flex items-center gap-2 ${section.accent}`}>
                {section.icon}
                <h2 className="text-lg font-bold text-stone-900">{section.title}</h2>
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-sm font-medium text-stone-600">
                  {section.items.length}
                </span>
              </div>

              <div className="space-y-3">
                {section.items.map((item) => {
                  const recipe = getRecipeForItem(item.id);
                  const status = getExpirationStatus(item.expirationDate);
                  return (
                    <div key={item.id} className="card overflow-hidden">
                      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <span className={`h-3 w-3 flex-shrink-0 rounded-full ${
                            status === 'expired' ? 'bg-red-500' :
                            status === 'critical' ? 'bg-orange-500' :
                            status === 'soon' ? 'bg-amber-500' : 'bg-brand-500'
                          }`} />
                          <div>
                            <h3 className="font-semibold text-stone-900">{item.name}</h3>
                            <p className="text-sm text-stone-500">
                              {item.quantity} {item.unit} · {item.location} · Expires {formatDate(item.expirationDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${expirationBadgeClasses[status]}`}
                          >
                            {formatRelativeExpiration(item.expirationDate)}
                          </span>
                          {recipe && (
                            <Link
                              href={`/recipes/${recipe.id}`}
                              className="btn-primary text-sm"
                            >
                              <ChefHat className="h-4 w-4" />
                              Cook Now
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
}
