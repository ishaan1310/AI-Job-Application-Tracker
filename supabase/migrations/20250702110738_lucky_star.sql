/*
  # Fix RLS Policies for User Registration

  1. Security Updates
    - Update RLS policy for users table to allow public insert during registration
    - This allows users to create their profile immediately after signup
    - The policy still enforces that users can only insert their own data via auth.uid()

  2. Changes Made
    - Modified "Users can insert own data" policy to use TO public instead of TO authenticated
    - This is secure because the WITH CHECK clause still validates auth.uid() = id
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Users can insert own data" ON users;

-- Create new insert policy that allows public access during registration
CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = id);