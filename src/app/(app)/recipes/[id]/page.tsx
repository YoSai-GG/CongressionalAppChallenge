import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Users, Flame, ChefHat, ArrowLeft, CheckCircle2, Package } from 'lucide-react';
import { recipes, pantryItems } from '@/data/mock-data';
import ExpirationBadge from '@/components/ExpirationBadge';

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: recipeId } = await params;
  const recipe = recipes.find((r) => r.id === recipeId);
  if (!recipe) notFound();

  const matchedItems = (recipe.matchedPantryItems ?? [])
    .map((pid) => pantryItems.find((p) => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/recipes"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Recipes
      </Link>

      {/* Hero */}
      <div className="overflow-hidden rounded-2xl shadow-sm">
        <div className="relative aspect-[16/9] bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-700 backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{recipe.title}</h1>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card flex items-center gap-3 p-4">
          <Clock className="h-5 w-5 text-brand-600" />
          <div>
            <p className="text-xs text-stone-500">Total Time</p>
            <p className="font-semibold text-stone-900">{recipe.prepTime + recipe.cookTime} min</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <ChefHat className="h-5 w-5 text-brand-600" />
          <div>
            <p className="text-xs text-stone-500">Difficulty</p>
            <p className="font-semibold text-stone-900">{recipe.difficulty}</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <Users className="h-5 w-5 text-brand-600" />
          <div>
            <p className="text-xs text-stone-500">Servings</p>
            <p className="font-semibold text-stone-900">{recipe.servings}</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <Flame className="h-5 w-5 text-brand-600" />
          <div>
            <p className="text-xs text-stone-500">Cuisine</p>
            <p className="font-semibold text-stone-900">{recipe.cuisine}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 text-lg text-stone-600">{recipe.description}</p>

      {/* Matched Pantry Items */}
      {matchedItems.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-bold text-stone-900">From Your Pantry</h2>
            <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-sm font-medium text-brand-700">
              {matchedItems.length} {matchedItems.length === 1 ? 'item' : 'items'} matched
            </span>
          </div>
          <p className="mt-1 text-sm text-stone-500">
            This recipe uses these ingredients from your pantry. Cook before they expire!
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {matchedItems.map((item) => (
              <div key={item.id} className="card flex items-center gap-3 px-4 py-3">
                <div>
                  <p className="font-medium text-stone-900">{item.name}</p>
                  <p className="text-xs text-stone-500">{item.quantity} {item.unit}</p>
                </div>
                <ExpirationBadge expirationDate={item.expirationDate} showRelative />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients & Steps */}
      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        {/* Ingredients */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-stone-900">Ingredients</h2>
          <ul className="mt-4 space-y-2">
            {recipe.ingredients.map((ing, idx) => {
              const isMatched = matchedItems.some(
                (m) => ing.name.toLowerCase().includes(m.name.toLowerCase()) ||
                m.name.toLowerCase().includes(ing.name.toLowerCase())
              );
              return (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2.5"
                >
                  <CheckCircle2
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 ${isMatched ? 'text-brand-600' : 'text-stone-300'}`}
                  />
                  <div>
                    <span className="font-medium text-stone-900">{ing.name}</span>
                    <span className="text-stone-500"> — {ing.amount}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Steps */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-bold text-stone-900">Instructions</h2>
          <ol className="mt-4 space-y-4">
            {recipe.steps.map((step, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {idx + 1}
                </span>
                <p className="pt-1 text-stone-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-brand-50 p-6 text-center">
        <h3 className="font-semibold text-stone-900">Enjoyed this recipe?</h3>
        <p className="mt-1 text-sm text-stone-600">
          Check your dashboard for more items to cook before they expire.
        </p>
        <Link href="/dashboard" className="btn-primary mt-4">
          <ChefHat className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
