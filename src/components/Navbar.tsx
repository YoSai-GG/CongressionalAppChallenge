'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ChefHat } from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/pantry', label: 'Pantry' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/expiration', label: 'Expiration' },
  { href: '/composting', label: 'Composting' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname != null && (pathname === href || pathname.startsWith(href + '/'));

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="PantryPilot home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
            <ChefHat className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold text-stone-900">PantryPilot</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <ul className="border-t border-stone-200 bg-white px-4 py-2 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
