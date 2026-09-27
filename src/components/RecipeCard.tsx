import Link from 'next/link';
import { Clock, Users, Flame, ChefHat } from 'lucide-react';
import type { Recipe } from '@/data/mock-data';

type Props = {
  recipe: Recipe;
  highlightMatched?: boolean;
};

export default function RecipeCard({ recipe, highlightMatched = false }: Props) {
  const matchedCount = recipe.matchedPantryItems?.length ?? 0;
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {highlightMatched && matchedCount > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
            {matchedCount} pantry {matchedCount === 1 ? 'match' : 'matches'}
          </div>
        )}
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-700 shadow-sm backdrop-blur">
          {recipe.difficulty}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-stone-900 group-hover:text-brand-700 transition-colors">
          {recipe.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-stone-500">{recipe.description}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {recipe.prepTime + recipe.cookTime} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {recipe.servings} servings
          </span>
          <span className="inline-flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" />
            {recipe.cuisine}
          </span>
        </div>

        {recipe.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600"
              >
                <ChefHat className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
