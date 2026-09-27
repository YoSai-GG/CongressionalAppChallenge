/*
# Create pantry_ingredients table (single-tenant, no auth)

1. New Tables
- `pantry_ingredients`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — ingredient name
  - `quantity` (numeric, not null, default 1) — amount of the ingredient
  - `unit` (text) — unit of measurement (e.g. cups, oz, pieces)
  - `category` (text) — food category (e.g. dairy, produce, pantry)
  - `expiration_date` (date, nullable) — when the ingredient expires
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `pantry_ingredients`.
- Allow anon + authenticated full CRUD because the data is intentionally shared/public (no sign-in screen).
*/

CREATE TABLE IF NOT EXISTS pantry_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity numeric NOT NULL DEFAULT 1,
  unit text,
  category text,
  expiration_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pantry_ingredients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_pantry_ingredients" ON pantry_ingredients;
CREATE POLICY "anon_select_pantry_ingredients" ON pantry_ingredients FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_pantry_ingredients" ON pantry_ingredients;
CREATE POLICY "anon_insert_pantry_ingredients" ON pantry_ingredients FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_pantry_ingredients" ON pantry_ingredients;
CREATE POLICY "anon_update_pantry_ingredients" ON pantry_ingredients FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_pantry_ingredients" ON pantry_ingredients;
CREATE POLICY "anon_delete_pantry_ingredients" ON pantry_ingredients FOR DELETE
  TO anon, authenticated USING (true);
