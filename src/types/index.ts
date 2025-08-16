export interface User {
  id: string;
  email: string;
  name: string;
  role: 'job-seeker' | 'admin' | 'career-coach';
  avatar?: string;
  location?: string;
  careerGoals?: string;
  preferredIndustries: string[];
  skills: string[];
  theme: 'light' | 'dark';
  createdAt: Date;
  lastLogin: Date;
  achievements: string[];
  streakCount: number;
  totalPoints: number;
}

export type JobStatus = 'saved' | 'applied' | 'interviewing' | 'rejected' | 'offer' | 'hired';

export interface JobApplication {
  id: string;
  userId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary?: number;
  salaryMax?: number;
  jobUrl?: string;
  description?: string;
  status: JobStatus;
  appliedDate?: Date;
  deadlineDate?: Date;
  notes: string;
  tags: string[];
  resumeId?: string;
  coverLetterId?: string;
  contactPerson?: string;
  contactEmail?: string;
  followUpDate?: Date;
  interviewDates: Date[];
  aiMatchScore?: number;
  skillGaps?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume {
  id: string;
  userId: string;
  name: string;
  version: number;
  fileName: string;
  fileUrl: string;
  content: string;
  tags: string[];
  isActive: boolean;
  aiScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoverLetter {
  id: string;
  userId: string;
  name: string;
  content: string;
  jobTitle?: string;
  company?: string;
  tags: string[];
  isTemplate: boolean;
  tone: 'professional' | 'friendly' | 'bold';
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'milestone' | 'streak' | 'skill';
  requirement: number;
  points: number;
  earned: Date | null;
}

export interface AIInsight {
  id: string;
  type: 'resume-match' | 'skill-gap' | 'interview-prep' | 'career-advice';
  jobId?: string;
  title: string;
  content: string;
  score?: number;
  suggestions: string[];
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'reminder' | 'follow-up' | 'interview' | 'achievement' | 'system';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  scheduledFor?: Date;
  createdAt: Date;
}

export interface Analytics {
  totalApplications: number;
  applicationsThisMonth: number;
  interviewRate: number;
  offerRate: number;
  avgResponseTime: number;
  topCompanies: Array<{ name: string; count: number }>;
  statusDistribution: Array<{ status: JobStatus; count: number }>;
  monthlyTrend: Array<{ month: string; applications: number; interviews: number; offers: number }>;
  skillGaps: Array<{ skill: string; frequency: number }>;
  salaryTrends: Array<{ range: string; count: number }>;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'technical' | 'behavioral' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  answer?: string;
  feedback?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  type: 'question' | 'success' | 'advice' | 'resource';
  tags: string[];
  likes: number;
  replies: number;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  avatar?: string;
  bio: string;
  isAvailable: boolean;
}

export interface JobRecommendation {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary?: number;
  salaryMax?: number;
  matchScore: number;
  reasons: string[];
  jobUrl: string;
  postedDate: Date;
}