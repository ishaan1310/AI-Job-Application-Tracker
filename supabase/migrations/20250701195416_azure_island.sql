/*
  # Initial Schema for Job Tracker Pro

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (text, default 'job-seeker')
      - `avatar` (text, optional)
      - `location` (text, optional)
      - `career_goals` (text, optional)
      - `preferred_industries` (text array)
      - `skills` (text array)
      - `theme` (text, default 'light')
      - `created_at` (timestamptz)
      - `last_login` (timestamptz)
      - `achievements` (text array)
      - `streak_count` (integer, default 0)
      - `total_points` (integer, default 0)

    - `job_applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `job_title` (text)
      - `company` (text)
      - `location` (text)
      - `salary` (integer, optional)
      - `salary_max` (integer, optional)
      - `job_url` (text, optional)
      - `description` (text, optional)
      - `status` (text, default 'saved')
      - `applied_date` (timestamptz, optional)
      - `deadline_date` (timestamptz, optional)
      - `notes` (text)
      - `tags` (text array)
      - `resume_id` (uuid, optional)
      - `cover_letter_id` (uuid, optional)
      - `contact_person` (text, optional)
      - `contact_email` (text, optional)
      - `follow_up_date` (timestamptz, optional)
      - `interview_dates` (timestamptz array)
      - `ai_match_score` (integer, optional)
      - `skill_gaps` (text array, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text DEFAULT 'job-seeker',
  avatar text,
  location text,
  career_goals text,
  preferred_industries text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  theme text DEFAULT 'light',
  created_at timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now(),
  achievements text[] DEFAULT '{}',
  streak_count integer DEFAULT 0,
  total_points integer DEFAULT 0
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  job_title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  salary integer,
  salary_max integer,
  job_url text,
  description text,
  status text DEFAULT 'saved',
  applied_date timestamptz,
  deadline_date timestamptz,
  notes text DEFAULT '',
  tags text[] DEFAULT '{}',
  resume_id uuid,
  cover_letter_id uuid,
  contact_person text,
  contact_email text,
  follow_up_date timestamptz,
  interview_dates timestamptz[] DEFAULT '{}',
  ai_match_score integer,
  skill_gaps text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for job_applications table
CREATE POLICY "Users can read own applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON job_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON job_applications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own applications"
  ON job_applications
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at);