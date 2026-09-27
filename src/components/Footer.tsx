import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ChefHat className="h-4 w-4" />
            </span>
            <span className="font-semibold text-stone-900">PantryPilot</span>
          </div>
          <p className="text-sm text-stone-500">
            Cook smarter, waste less, eat better.
          </p>
          <nav className="flex gap-4 text-sm text-stone-500">
            <Link href="/dashboard" className="hover:text-brand-600 transition-colors">Dashboard</Link>
            <Link href="/pantry" className="hover:text-brand-600 transition-colors">Pantry</Link>
            <Link href="/composting" className="hover:text-brand-600 transition-colors">Composting</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
