export type PantryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expirationDate: string; // ISO date
  location: string;
  notes?: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  tags: string[];
  matchedPantryItems?: string[];
};

export type CompostTip = {
  id: string;
  title: string;
  description: string;
  category: 'Green' | 'Brown' | 'Avoid';
  icon: string;
};

const today = new Date();
const daysFromNow = (n: number): string => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};

export const pantryItems: PantryItem[] = [
  { id: 'p1', name: 'Whole Milk', quantity: 1, unit: 'gallon', category: 'Dairy', expirationDate: daysFromNow(2), location: 'Fridge' },
  { id: 'p2', name: 'Baby Spinach', quantity: 5, unit: 'cups', category: 'Produce', expirationDate: daysFromNow(1), location: 'Fridge' },
  { id: 'p3', name: 'Chicken Breast', quantity: 2, unit: 'lb', category: 'Meat & Poultry', expirationDate: daysFromNow(3), location: 'Fridge' },
  { id: 'p4', name: 'Greek Yogurt', quantity: 32, unit: 'oz', category: 'Dairy', expirationDate: daysFromNow(5), location: 'Fridge' },
  { id: 'p5', name: 'Sourdough Bread', quantity: 1, unit: 'loaf', category: 'Bakery', expirationDate: daysFromNow(4), location: 'Counter' },
  { id: 'p6', name: 'Cherry Tomatoes', quantity: 2, unit: 'cups', category: 'Produce', expirationDate: daysFromNow(2), location: 'Counter' },
  { id: 'p7', name: 'Fresh Basil', quantity: 1, unit: 'bunch', category: 'Produce', expirationDate: daysFromNow(0), location: 'Counter' },
  { id: 'p8', name: 'Eggs', quantity: 12, unit: 'pcs', category: 'Dairy', expirationDate: daysFromNow(14), location: 'Fridge' },
  { id: 'p9', name: 'Avocados', quantity: 4, unit: 'pcs', category: 'Produce', expirationDate: daysFromNow(3), location: 'Counter' },
  { id: 'p10', name: 'Cheddar Cheese', quantity: 8, unit: 'oz', category: 'Dairy', expirationDate: daysFromNow(21), location: 'Fridge' },
  { id: 'p11', name: 'Bell Peppers', quantity: 3, unit: 'pcs', category: 'Produce', expirationDate: daysFromNow(6), location: 'Fridge' },
  { id: 'p12', name: 'Brown Rice', quantity: 2, unit: 'cups', category: 'Pantry', expirationDate: daysFromNow(180), location: 'Pantry' },
  { id: 'p13', name: 'Olive Oil', quantity: 16, unit: 'fl oz', category: 'Pantry', expirationDate: daysFromNow(365), location: 'Pantry' },
  { id: 'p14', name: 'Bananas', quantity: 6, unit: 'pcs', category: 'Produce', expirationDate: daysFromNow(1), location: 'Counter' },
  { id: 'p15', name: 'Salmon Fillet', quantity: 1, unit: 'lb', category: 'Seafood', expirationDate: daysFromNow(2), location: 'Fridge' },
  { id: 'p16', name: 'Fresh Strawberries', quantity: 1, unit: 'pint', category: 'Produce', expirationDate: daysFromNow(0), location: 'Fridge' },
];

export const recipes: Recipe[] = [
  {
    id: 'r1',
    title: 'Creamy Spinach & Basil Pasta',
    description: 'A quick weeknight pasta that uses up fresh greens before they wilt. Ready in 20 minutes.',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg',
    prepTime: 5,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Italian',
    ingredients: [
      { name: 'Baby Spinach', amount: '4 cups' },
      { name: 'Fresh Basil', amount: '1 bunch' },
      { name: 'Sourdough Bread', amount: '2 slices (for breadcrumbs)' },
      { name: 'Olive Oil', amount: '3 tbsp' },
      { name: 'Garlic', amount: '3 cloves' },
      { name: 'Heavy Cream', amount: '½ cup' },
      { name: 'Pasta', amount: '12 oz' },
      { name: 'Parmesan', amount: '¼ cup' },
    ],
    steps: [
      'Cook pasta according to package directions. Reserve 1 cup of pasta water before draining.',
      'In a large skillet, heat olive oil over medium heat. Add minced garlic and sauté until fragrant, about 30 seconds.',
      'Add spinach and basil to the skillet. Cook until wilted, about 2–3 minutes.',
      'Pour in heavy cream and bring to a gentle simmer. Add half the pasta water and stir.',
      'Toss drained pasta into the sauce. Add Parmesan and stir until creamy. Add more pasta water if needed.',
      'Toast sourdough breadcrumbs in a dry pan until golden. Sprinkle over pasta before serving.',
    ],
    tags: ['Quick', 'Vegetarian', 'Uses expiring greens'],
    matchedPantryItems: ['p2', 'p7', 'p5', 'p13'],
  },
  {
    id: 'r2',
    title: 'Tomato & Basil Bruschetta',
    description: 'A fresh appetizer that makes the most of ripe tomatoes and basil on their last day.',
    image: 'https://images.pexels.com/photos/4193886/pexels-photo-4193886.jpeg',
    prepTime: 10,
    cookTime: 8,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Italian',
    ingredients: [
      { name: 'Cherry Tomatoes', amount: '2 cups' },
      { name: 'Fresh Basil', amount: '1 bunch' },
      { name: 'Sourdough Bread', amount: '1 loaf' },
      { name: 'Olive Oil', amount: '3 tbsp' },
      { name: 'Garlic', amount: '2 cloves' },
      { name: 'Salt & Pepper', amount: 'to taste' },
    ],
    steps: [
      'Preheat oven to 400°F. Slice sourdough into ½-inch thick pieces.',
      'Brush bread with olive oil and toast until golden, about 6–8 minutes.',
      'Dice cherry tomatoes and place in a bowl. Tear basil leaves and add.',
      'Drizzle with olive oil, season with salt and pepper, and toss.',
      'Rub each toast with a garlic clove, then top with the tomato mixture.',
      'Serve immediately while bread is still warm and crisp.',
    ],
    tags: ['Quick', 'Vegetarian', 'No-cook topping'],
    matchedPantryItems: ['p6', 'p7', 'p5', 'p13'],
  },
  {
    id: 'r3',
    title: 'Pan-Seared Salmon with Avocado Salsa',
    description: 'Crispy-skinned salmon topped with a bright avocado salsa. Perfect for using ripe avocados.',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    difficulty: 'Medium',
    cuisine: 'American',
    ingredients: [
      { name: 'Salmon Fillet', amount: '1 lb' },
      { name: 'Avocados', amount: '2 pcs' },
      { name: 'Lime', amount: '1' },
      { name: 'Cherry Tomatoes', amount: '1 cup' },
      { name: 'Olive Oil', amount: '2 tbsp' },
      { name: 'Salt & Pepper', amount: 'to taste' },
    ],
    steps: [
      'Pat salmon dry and season generously with salt and pepper.',
      'Heat olive oil in a skillet over medium-high heat. Place salmon skin-side down.',
      'Press gently and cook for 4–5 minutes until skin is crispy. Flip and cook 2–3 more minutes.',
      'Dice avocados and tomatoes. Toss with lime juice and a pinch of salt.',
      'Plate salmon and spoon avocado salsa on top. Serve immediately.',
    ],
    tags: ['High Protein', 'Omega-3', 'Quick'],
    matchedPantryItems: ['p15', 'p9', 'p6', 'p13'],
  },
  {
    id: 'r4',
    title: 'Banana Berry Smoothie Bowl',
    description: 'A creamy breakfast bowl that rescues overripe bananas and strawberries.',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Breakfast',
    ingredients: [
      { name: 'Bananas', amount: '3 pcs' },
      { name: 'Fresh Strawberries', amount: '1 pint' },
      { name: 'Greek Yogurt', amount: '1 cup' },
      { name: 'Honey', amount: '2 tbsp' },
      { name: 'Granola', amount: '½ cup' },
    ],
    steps: [
      'Peel and freeze bananas for at least 1 hour (or overnight if planning ahead).',
      'Blend frozen bananas, strawberries, and Greek yogurt until smooth and thick.',
      'Pour into bowls and drizzle with honey.',
      'Top with granola, fresh strawberry slices, and any extra fruit you have on hand.',
    ],
    tags: ['Breakfast', 'No-cook', 'Vegetarian'],
    matchedPantryItems: ['p14', 'p16', 'p4'],
  },
  {
    id: 'r5',
    title: 'Chicken & Bell Pepper Stir-Fry',
    description: 'A colorful stir-fry that uses up chicken and peppers before they spoil.',
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg',
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Asian',
    ingredients: [
      { name: 'Chicken Breast', amount: '2 lb' },
      { name: 'Bell Peppers', amount: '3 pcs' },
      { name: 'Brown Rice', amount: '2 cups' },
      { name: 'Soy Sauce', amount: '3 tbsp' },
      { name: 'Garlic', amount: '3 cloves' },
      { name: 'Ginger', amount: '1 tbsp' },
      { name: 'Olive Oil', amount: '2 tbsp' },
    ],
    steps: [
      'Cook brown rice according to package directions.',
      'Slice chicken into thin strips. Slice bell peppers into strips.',
      'Heat oil in a wok over high heat. Add chicken and stir-fry until browned, about 5 minutes.',
      'Add garlic and ginger. Stir for 30 seconds until fragrant.',
      'Add bell peppers and stir-fry for 3–4 minutes until crisp-tender.',
      'Add soy sauce, toss everything together, and serve over brown rice.',
    ],
    tags: ['High Protein', 'Meal Prep', 'Uses expiring chicken'],
    matchedPantryItems: ['p3', 'p11', 'p12', 'p13'],
  },
  {
    id: 'r6',
    title: 'Avocado Toast with Poached Egg',
    description: 'A simple breakfast that uses ripe avocados and fresh eggs.',
    image: 'https://images.pexels.com/photos/5218011/pexels-photo-5218011.jpeg',
    prepTime: 5,
    cookTime: 8,
    servings: 1,
    difficulty: 'Easy',
    cuisine: 'Breakfast',
    ingredients: [
      { name: 'Avocados', amount: '1 pc' },
      { name: 'Eggs', amount: '2 pcs' },
      { name: 'Sourdough Bread', amount: '2 slices' },
      { name: 'Salt & Pepper', amount: 'to taste' },
      { name: 'Red Pepper Flakes', amount: 'pinch' },
    ],
    steps: [
      'Toast sourdough slices until golden brown.',
      'Bring a pot of water to a gentle simmer. Crack eggs into a small bowl.',
      'Stir water to create a vortex, gently slide eggs in, and poach for 3 minutes.',
      'Mash avocado with a fork, season with salt and pepper.',
      'Spread avocado on toast, top with poached eggs, and sprinkle with red pepper flakes.',
    ],
    tags: ['Breakfast', 'Quick', 'Vegetarian'],
    matchedPantryItems: ['p9', 'p8', 'p5'],
  },
];

export const compostTips: CompostTip[] = [
  {
    id: 'c1',
    title: 'Fruit & Vegetable Scraps',
    description: 'Peels, cores, rinds, and tops from fruits and vegetables are nitrogen-rich "green" materials. Chop them small to speed up decomposition.',
    category: 'Green',
    icon: 'apple',
  },
  {
    id: 'c2',
    title: 'Coffee Grounds & Filters',
    description: 'Used coffee grounds are an excellent green material. The filters can go in too — they count as brown material once dry.',
    category: 'Green',
    icon: 'coffee',
  },
  {
    id: 'c3',
    title: 'Eggshells',
    description: 'Crushed eggshells add calcium to your compost. Rinse them lightly and crush before adding to deter pests.',
    category: 'Green',
    icon: 'egg',
  },
  {
    id: 'c4',
    title: 'Dry Leaves & Twigs',
    description: 'Carbon-rich "brown" materials. Shred leaves before adding to help them break down faster.',
    category: 'Brown',
    icon: 'leaf',
  },
  {
    id: 'c5',
    title: 'Cardboard & Newspaper',
    description: 'Uncoated cardboard and newspaper are great brown materials. Tear into small pieces and keep them dry before adding.',
    category: 'Brown',
    icon: 'newspaper',
  },
  {
    id: 'c6',
    title: 'Meat & Dairy',
    description: 'Avoid composting meat, bones, and dairy. They attract pests and create odors. Consider municipal composting instead.',
    category: 'Avoid',
    icon: 'x',
  },
  {
    id: 'c7',
    title: 'Oily & Greasy Foods',
    description: 'Oil and grease slow down decomposition and attract animals. Keep them out of your home compost bin.',
    category: 'Avoid',
    icon: 'x',
  },
  {
    id: 'c8',
    title: 'Grass Clippings',
    description: 'Fresh grass clippings are green material. Add in thin layers to prevent matting and odors.',
    category: 'Green',
    icon: 'grass',
  },
];
