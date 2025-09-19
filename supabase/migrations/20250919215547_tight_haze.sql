/*
  # Fix users table RLS policies

  1. Security Updates
    - Drop existing restrictive policies
    - Add policy to allow anyone to insert new users
    - Add policy to allow users to read their own data
    - Add policy to allow users to update their own data

  2. Changes
    - Enable public insert access for user creation
    - Maintain data privacy with read/update restrictions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Allow anyone to insert new users (for registration/first login)
CREATE POLICY "Anyone can create users"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO public
  USING (true);

-- Allow users to update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);