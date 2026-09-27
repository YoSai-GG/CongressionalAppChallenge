import Link from 'next/link';
import {
  Package,
  CalendarClock,
  AlertTriangle,
  ChefHat,
  ArrowRight,
  Clock,
  Users,
  Flame,
} from 'lucide-react';
import { pantryItems, recipes } from '@/data/mock-data';
import { getDaysUntilExpiration, getExpirationStatus, formatRelativeExpiration } from '@/lib/expiration';
import StatCard from '@/components/StatCard';
import ExpirationBadge from '@/components/ExpirationBadge';

export default function DashboardPage() {
  const sorted = [...pantryItems].sort(
    (a, b) => getDaysUntilExpiration(a.expirationDate) - getDaysUntilExpiration(b.expirationDate)
  );

  const expired = sorted.filter((i) => getExpirationStatus(i.expirationDate) === 'expired');
  const expiringSoon = sorted.filter((i) => {
    const s = getExpirationStatus(i.expirationDate);
    return s === 'critical' || s === 'soon';
  });
  const fresh = sorted.filter((i) => getExpirationStatus(i.expirationDate) === 'fresh');

  // Build expiring list with matched recipe
  const expiringWithRecipes = expiringSoon.map((item) => {
    const matched = recipes
      .filter((r) => r.matchedPantryItems?.includes(item.id))
      .sort((a, b) => (b.matchedPantryItems?.length ?? 0) - (a.matchedPantryItems?.length ?? 0));
    return { item, recommendedRecipe: matched[0] ?? null };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="mt-1 text-stone-500">
          Here's what's happening in your kitchen today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Pantry Items"
          value={pantryItems.length}
          icon={<Package className="h-6 w-6" />}
          accent="brand"
        />
        <StatCard
          label="Expiring Soon"
          value={expiringSoon.length}
          sublabel="Within 5 days"
          icon={<CalendarClock className="h-6 w-6" />}
          accent="amber"
        />
        <StatCard
          label="Expired"
          value={expired.length}
          sublabel="Needs attention"
          icon={<AlertTriangle className="h-6 w-6" />}
          accent="red"
        />
        <StatCard
          label="Fresh"
          value={fresh.length}
          sublabel="Good to go"
          icon={<ChefHat className="h-6 w-6" />}
          accent="brand"
        />
      </div>

      {/* Cook Before It Expires */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Cook Before It Expires</h2>
            <p className="mt-1 text-sm text-stone-500">
              These items are expiring soon. Cook them tonight with a recommended recipe.
            </p>
          </div>
          <Link
            href="/expiration"
            className="hidden text-sm font-medium text-brand-600 hover:text-brand-700 sm:inline-flex sm:items-center sm:gap-1"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {expiringWithRecipes.length === 0 ? (
          <div className="card mt-4 p-8 text-center">
            <ChefHat className="mx-auto h-10 w-10 text-brand-300" />
            <p className="mt-3 font-medium text-stone-700">Nothing expiring soon!</p>
            <p className="mt-1 text-sm text-stone-500">Your pantry is in great shape.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {expiringWithRecipes.slice(0, 5).map(({ item, recommendedRecipe }) => (
              <div
                key={item.id}
                className="card overflow-hidden transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-0 sm:flex-row">
                  {/* Expiring item panel */}
                  <div className="flex flex-col justify-center border-b border-stone-100 p-5 sm:w-64 sm:border-b-0 sm:border-r">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-stone-900">{item.name}</h3>
                        <p className="text-sm text-stone-500">
                          {item.quantity} {item.unit} · {item.category}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <ExpirationBadge expirationDate={item.expirationDate} />
                    </div>
                  </div>

                  {/* Recommended recipe panel */}
                  {recommendedRecipe ? (
                    <div className="flex flex-1 items-center gap-4 p-5">
                      <div className="hidden h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100 sm:block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={recommendedRecipe.image}
                          alt={recommendedRecipe.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-medium text-brand-600">Recommended recipe</span>
                        <h4 className="truncate font-semibold text-stone-900">
                          {recommendedRecipe.title}
                        </h4>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-stone-500">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {recommendedRecipe.prepTime + recommendedRecipe.cookTime} min
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {recommendedRecipe.servings} servings
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            {recommendedRecipe.cuisine}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/recipes/${recommendedRecipe.id}`}
                        className="btn-primary flex-shrink-0 text-sm"
                      >
                        <ChefHat className="h-4 w-4" />
                        Cook Now
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center p-5">
                      <div className="flex items-center gap-3 text-stone-500">
                        <Package className="h-8 w-8 text-stone-300" />
                        <div>
                          <p className="text-sm font-medium text-stone-700">No matching recipe yet</p>
                          <p className="text-xs">Check the recipes page for ideas.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Links */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link href="/pantry" className="card p-6 transition-shadow hover:shadow-md">
          <Package className="h-8 w-8 text-brand-600" />
          <h3 className="mt-3 font-semibold text-stone-900">Manage Pantry</h3>
          <p className="mt-1 text-sm text-stone-500">View, add, and edit your ingredients.</p>
        </Link>
        <Link href="/recipes" className="card p-6 transition-shadow hover:shadow-md">
          <ChefHat className="h-8 w-8 text-brand-600" />
          <h3 className="mt-3 font-semibold text-stone-900">Browse Recipes</h3>
          <p className="mt-1 text-sm text-stone-500">Find recipes that match your pantry.</p>
        </Link>
        <Link href="/composting" className="card p-6 transition-shadow hover:shadow-md">
          <ChefHat className="h-8 w-8 text-brand-600" />
          <h3 className="mt-3 font-semibold text-stone-900">Composting Guide</h3>
          <p className="mt-1 text-sm text-stone-500">Learn what to compost and what to avoid.</p>
        </Link>
      </section>
    </div>
  );
}
