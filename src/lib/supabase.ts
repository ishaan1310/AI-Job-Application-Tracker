import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'https://your-project-id.supabase.co' || 
    supabaseAnonKey === 'your-anon-key-here') {
  console.error('⚠️  Supabase configuration required!');
  console.error('Please update your .env file with your actual Supabase credentials:');
  console.error('1. Go to https://supabase.com/dashboard');
  console.error('2. Select your project');
  console.error('3. Go to Settings > API');
  console.error('4. Copy your Project URL and anon key to .env file');
  console.error('5. Restart your development server');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: string;
          avatar?: string;
          location?: string;
          career_goals?: string;
          preferred_industries: string[];
          skills: string[];
          theme: string;
          created_at: string;
          last_login: string;
          achievements: string[];
          streak_count: number;
          total_points: number;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: string;
          avatar?: string;
          location?: string;
          career_goals?: string;
          preferred_industries?: string[];
          skills?: string[];
          theme?: string;
          created_at?: string;
          last_login?: string;
          achievements?: string[];
          streak_count?: number;
          total_points?: number;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: string;
          avatar?: string;
          location?: string;
          career_goals?: string;
          preferred_industries?: string[];
          skills?: string[];
          theme?: string;
          created_at?: string;
          last_login?: string;
          achievements?: string[];
          streak_count?: number;
          total_points?: number;
        };
      };
      job_applications: {
        Row: {
          id: string;
          user_id: string;
          job_title: string;
          company: string;
          location: string;
          salary?: number;
          salary_max?: number;
          job_url?: string;
          description?: string;
          status: string;
          applied_date?: string;
          deadline_date?: string;
          notes: string;
          tags: string[];
          resume_id?: string;
          cover_letter_id?: string;
          contact_person?: string;
          contact_email?: string;
          follow_up_date?: string;
          interview_dates: string[];
          ai_match_score?: number;
          skill_gaps?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          job_title: string;
          company: string;
          location: string;
          salary?: number;
          salary_max?: number;
          job_url?: string;
          description?: string;
          status?: string;
          applied_date?: string;
          deadline_date?: string;
          notes?: string;
          tags?: string[];
          resume_id?: string;
          cover_letter_id?: string;
          contact_person?: string;
          contact_email?: string;
          follow_up_date?: string;
          interview_dates?: string[];
          ai_match_score?: number;
          skill_gaps?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          job_title?: string;
          company?: string;
          location?: string;
          salary?: number;
          salary_max?: number;
          job_url?: string;
          description?: string;
          status?: string;
          applied_date?: string;
          deadline_date?: string;
          notes?: string;
          tags?: string[];
          resume_id?: string;
          cover_letter_id?: string;
          contact_person?: string;
          contact_email?: string;
          follow_up_date?: string;
          interview_dates?: string[];
          ai_match_score?: number;
          skill_gaps?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}