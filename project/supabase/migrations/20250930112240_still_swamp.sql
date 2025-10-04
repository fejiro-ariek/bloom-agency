/*
  # Create applications table

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `full_name` (text)
      - `instagram` (text)
      - `university` (text)
      - `degree` (text)
      - `phone` (text)
      - `why_you` (text)
      - `experience` (text)
      - `female_uk` (boolean)
      - `privacy` (boolean)

  2. Security
    - Enable RLS on `applications` table
    - Add policy for public insert (since this is a public form)
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  instagram text NOT NULL,
  university text NOT NULL,
  degree text NOT NULL,
  phone text NOT NULL,
  why_you text NOT NULL,
  experience text NOT NULL,
  female_uk boolean NOT NULL DEFAULT false,
  privacy boolean NOT NULL DEFAULT false
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for the application form
CREATE POLICY "Allow public inserts"
  ON applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all applications (for admin purposes)
CREATE POLICY "Allow authenticated read"
  ON applications
  FOR SELECT
  TO authenticated
  USING (true);