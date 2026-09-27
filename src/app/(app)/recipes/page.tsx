import { recipes } from '@/data/mock-data';
import RecipeCard from '@/components/RecipeCard';
import { ChefHat } from 'lucide-react';

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Recipes</h1>
        <p className="mt-1 text-stone-500">
          Discover recipes that use your pantry ingredients. Items with the most pantry matches are highlighted.
        </p>
      </div>

      {/* Featured: Cook Before It Expires */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-brand-50 to-emerald-50 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
            <ChefHat className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-semibold text-stone-900">Cook Before It Expires</h2>
            <p className="text-sm text-stone-600">
              Recipes highlighted with a green badge use your soonest-to-expire ingredients.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} highlightMatched />
        ))}
      </div>
    </div>
  );
}
