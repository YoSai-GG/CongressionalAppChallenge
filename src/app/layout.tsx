import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PantryPilot — Cook Smarter, Waste Less',
  description:
    'Track your pantry, get recipe recommendations before food expires, and learn composting tips. Reduce food waste one meal at a time.',
  openGraph: {
    title: 'PantryPilot — Cook Smarter, Waste Less',
    description: 'Track your pantry, get recipe recommendations before food expires, and learn composting tips.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
