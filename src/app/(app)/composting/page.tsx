import { Leaf, Apple, Coffee, Egg, Recycle, X, Newspaper } from 'lucide-react';
import { compostTips } from '@/data/mock-data';

const iconMap: Record<string, React.ReactNode> = {
  apple: <Apple className="h-6 w-6" />,
  coffee: <Coffee className="h-6 w-6" />,
  egg: <Egg className="h-6 w-6" />,
  leaf: <Leaf className="h-6 w-6" />,
  newspaper: <Newspaper className="h-6 w-6" />,
  x: <X className="h-6 w-6" />,
  grass: <Leaf className="h-6 w-6" />,
};

const categoryConfig = {
  Green: {
    label: 'Green Material (Nitrogen-Rich)',
    description: 'These add nitrogen and moisture to your compost. They decompose quickly and feed the microorganisms.',
    badge: 'bg-brand-50 text-brand-700 border-brand-200',
    icon: <Leaf className="h-5 w-5" />,
    accent: 'text-brand-600',
  },
  Brown: {
    label: 'Brown Material (Carbon-Rich)',
    description: 'These add carbon and structure to your compost. They create air pockets that keep the pile healthy.',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: <Recycle className="h-5 w-5" />,
    accent: 'text-amber-600',
  },
  Avoid: {
    label: 'Do NOT Compost',
    description: 'These materials attract pests, create odors, or contain pathogens. Keep them out of your home compost.',
    badge: 'bg-red-50 text-red-700 border-red-200',
    icon: <X className="h-5 w-5" />,
    accent: 'text-red-600',
  },
};

export default function CompostingPage() {
  const greens = compostTips.filter((t) => t.category === 'Green');
  const browns = compostTips.filter((t) => t.category === 'Brown');
  const avoid = compostTips.filter((t) => t.category === 'Avoid');

  const sections = [
    { tips: greens, key: 'Green' as const },
    { tips: browns, key: 'Brown' as const },
    { tips: avoid, key: 'Avoid' as const },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Composting Guide</h1>
        <p className="mt-1 max-w-2xl text-stone-500">
          Turn your food scraps into nutrient-rich compost. Learn what to compost, what to avoid, and how to keep your pile healthy.
        </p>
      </div>

      {/* Intro card */}
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-brand-50 to-emerald-50 p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Leaf className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-semibold text-stone-900">Why compost?</h2>
            <p className="mt-1 text-sm text-stone-600">
              Food scraps make up about 30% of household waste. Composting reduces methane emissions from landfills,
              creates free fertilizer for your plants, and closes the food loop — from pantry to plate to garden.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {sections.map(({ tips, key }) => {
          const config = categoryConfig[key];
          return (
            <section key={key}>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className={config.accent}>{config.icon}</span>
                  <h2 className="text-lg font-bold text-stone-900">{config.label}</h2>
                </div>
                <p className="mt-1 text-sm text-stone-500">{config.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tips.map((tip) => (
                  <div key={tip.id} className="card p-5">
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${config.badge}`}
                      >
                        {iconMap[tip.icon] ?? <Leaf className="h-6 w-6" />}
                      </span>
                      <div>
                        <h3 className="font-semibold text-stone-900">{tip.title}</h3>
                        <p className="mt-1 text-sm text-stone-500">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Tips box */}
      <div className="mt-10 card p-6">
        <h2 className="text-lg font-bold text-stone-900">Quick Tips for Great Compost</h2>
        <ul className="mt-4 space-y-3 text-sm text-stone-600">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
            Aim for a 2:1 ratio of brown to green materials for the best decomposition balance.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
            Chop or tear large items into smaller pieces to speed up the process.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
            Turn your pile every 1–2 weeks to add oxygen and prevent odors.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
            Keep the pile as moist as a wrung-out sponge — not too dry, not too wet.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
            Compost is ready in 2–6 months when it's dark, crumbly, and smells earthy.
          </li>
        </ul>
      </div>
    </div>
  );
}
