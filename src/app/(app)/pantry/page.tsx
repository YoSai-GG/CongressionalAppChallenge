'use client';

import { useState, useMemo } from 'react';
import { Plus, X, Loader2, Search, Package } from 'lucide-react';
import { pantryItems as initialItems, type PantryItem } from '@/data/mock-data';
import { getDaysUntilExpiration } from '@/lib/expiration';
import PantryItemCard from '@/components/PantryItemCard';

const CATEGORIES = [
  'Produce', 'Dairy', 'Meat & Poultry', 'Seafood', 'Bakery',
  'Pantry', 'Frozen', 'Beverages', 'Snacks', 'Spices & Seasonings',
  'Condiments', 'Other',
];

const UNITS = [
  'pcs', 'cups', 'tbsp', 'tsp', 'oz', 'lb', 'g', 'kg',
  'ml', 'L', 'fl oz', 'cans', 'boxes', 'bags', 'bottles', 'loaf', 'bunch', 'gallon', 'pint',
];

const LOCATIONS = ['Fridge', 'Freezer', 'Pantry', 'Counter'];

type FormState = {
  name: string;
  quantity: string;
  unit: string;
  category: string;
  expirationDate: string;
  location: string;
};

const emptyForm: FormState = {
  name: '',
  quantity: '',
  unit: 'pcs',
  category: 'Produce',
  expirationDate: '',
  location: 'Fridge',
};

export default function PantryPage() {
  const [items, setItems] = useState<PantryItem[]>(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const sorted = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          getDaysUntilExpiration(a.expirationDate) - getDaysUntilExpiration(b.expirationDate)
      ),
    [items]
  );

  const filtered = useMemo(() => {
    return sorted.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sorted, search, filterCategory]);

  const resetForm = () => {
    setForm(emptyForm);
    setFormError(null);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = form.name.trim();
    if (!trimmedName) {
      setFormError('Please enter an ingredient name.');
      return;
    }
    const qty = parseFloat(form.quantity);
    if (isNaN(qty) || qty <= 0) {
      setFormError('Please enter a valid quantity greater than zero.');
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: trimmedName,
                quantity: qty,
                unit: form.unit,
                category: form.category,
                expirationDate: form.expirationDate || item.expirationDate,
                location: form.location,
              }
            : item
        )
      );
    } else {
      const newItem: PantryItem = {
        id: `p${Date.now()}`,
        name: trimmedName,
        quantity: qty,
        unit: form.unit,
        category: form.category,
        expirationDate: form.expirationDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        location: form.location,
      };
      setItems((prev) => [newItem, ...prev]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (item: PantryItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      quantity: String(item.quantity),
      unit: item.unit,
      category: item.category,
      expirationDate: item.expirationDate,
      location: item.location,
    });
    setFormError(null);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">My Pantry</h1>
          <p className="mt-1 text-stone-500">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your kitchen
          </p>
        </div>
        <button
          onClick={() => {
            if (showForm) resetForm();
            setShowForm(!showForm);
          }}
          className="btn-primary"
        >
          {showForm ? (
            <>
              <X className="h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add Ingredient
            </>
          )}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-8 animate-fade-in overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-100 bg-stone-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-stone-900">
              {editingId ? 'Edit Ingredient' : 'Add a New Ingredient'}
            </h2>
            <p className="mt-0.5 text-sm text-stone-500">
              {editingId
                ? 'Update the details for this pantry item.'
                : 'Fill in the details below to track a new item.'}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Ingredient Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Whole milk"
                  className="input-field"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="quantity" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  id="quantity"
                  type="number"
                  step="any"
                  min="0"
                  value={form.quantity}
                  onChange={(e) => updateField('quantity', e.target.value)}
                  placeholder="e.g. 2"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="unit" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Unit
                </label>
                <select
                  id="unit"
                  value={form.unit}
                  onChange={(e) => updateField('unit', e.target.value)}
                  className="input-field bg-white"
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Category
                </label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="input-field bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Location
                </label>
                <select
                  id="location"
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="input-field bg-white"
                >
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="expiration" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Expiration Date
                </label>
                <input
                  id="expiration"
                  type="date"
                  value={form.expirationDate}
                  onChange={(e) => updateField('expirationDate', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {formError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <Plus className="h-4 w-4" />
                {editingId ? 'Update Ingredient' : 'Save Ingredient'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search ingredients…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
            aria-label="Search pantry"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input-field bg-white sm:w-48"
          aria-label="Filter by category"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Pantry Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
            <Package className="h-8 w-8 text-stone-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-stone-700">
            {items.length === 0 ? 'Your pantry is empty' : 'No items match your search'}
          </h3>
          <p className="mt-1 max-w-sm text-sm text-stone-500">
            {items.length === 0
              ? 'Click "Add Ingredient" to start tracking what you have at home.'
              : 'Try a different search term or category filter.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <PantryItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
