import Link from 'next/link';
import {
  ChefHat,
  Clock,
  Trash2,
  Sparkles,
  ArrowRight,
  CalendarClock,
  Package,
  BookOpen,
  Leaf,
} from 'lucide-react';

const features = [
  {
    icon: <Package className="h-6 w-6" />,
    title: 'Track Your Pantry',
    description: 'Keep an up-to-date inventory of everything in your kitchen — quantities, locations, and expiration dates at a glance.',
  },
  {
    icon: <CalendarClock className="h-6 w-6" />,
    title: 'Expiration Alerts',
    description: 'See which items are expiring soon, with color-coded urgency levels so nothing slips through the cracks.',
  },
  {
    icon: <ChefHat className="h-6 w-6" />,
    title: 'Cook Before It Expires',
    description: 'Get recipe recommendations that use your soonest-to-expire ingredients first — turn near-waste into dinner.',
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: 'Composting Guide',
    description: 'Learn what to compost and what to avoid. Turn food scraps into garden gold instead of landfill waste.',
  },
];

const steps = [
  {
    number: '01',
    title: 'See what\'s expiring',
    description: 'Your dashboard highlights items expiring within days, sorted by urgency.',
  },
  {
    number: '02',
    title: 'Cook Before It Expires',
    description: 'Tap any expiring item to get matched recipes that use it as a key ingredient.',
  },
  {
    number: '03',
    title: 'Enjoy and reduce waste',
    description: 'Cook the recommended recipe, track what you used, and compost the rest.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                <Sparkles className="h-4 w-4" />
                Reduce food waste, one meal at a time
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Cook smarter,
                <br />
                <span className="text-brand-600">waste less</span>.
              </h1>
              <p className="mt-6 max-w-lg text-lg text-stone-600">
                PantryPilot tracks what's in your kitchen, alerts you before food expires,
                and recommends recipes to use it up — so nothing goes to waste.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard" className="btn-primary text-base">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/recipes" className="btn-secondary text-base">
                  <BookOpen className="h-4 w-4" />
                  Browse Recipes
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-stone-500">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-600" />
                  20-minute recipes
                </span>
                <span className="inline-flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-brand-600" />
                  Less food waste
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/8900043/pexels-photo-8900043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Fresh vegetables arranged on a kitchen counter"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-lg sm:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100">
                    <CalendarClock className="h-5 w-5 text-brand-600" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">3 items expiring</p>
                    <p className="text-xs text-stone-500">Cook them tonight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-stone-900">Everything you need to stop wasting food</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
            From pantry tracking to recipe recommendations, PantryPilot helps you make the most of every ingredient.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="card p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                {feature.icon}
              </span>
              <h3 className="mt-4 font-semibold text-stone-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-stone-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-stone-900">How it works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
              Three simple steps from expiring food to a delicious meal.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={step.number} className="relative">
                {idx < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-full bg-stone-200 md:block" />
                )}
                <div className="relative flex flex-col items-start">
                  <span className="text-4xl font-bold text-brand-200">{step.number}</span>
                  <h3 className="mt-2 font-semibold text-lg text-stone-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-stone-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/dashboard" className="btn-primary">
              Try the Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to stop wasting food?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-50">
            Join PantryPilot and turn your expiring ingredients into delicious meals tonight.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
