import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
        <ChefHat className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-stone-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-stone-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}
