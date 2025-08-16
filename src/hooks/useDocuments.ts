import { useState, useEffect } from 'react';
import { Resume, CoverLetter } from '../types';
import { useAuth } from '../contexts/AuthContext';

const generateMockResumes = (userId: string): Resume[] => [
  {
    id: '1',
    userId,
    name: 'Software Engineer Resume',
    version: 3,
    fileName: 'john_doe_resume_v3.pdf',
    fileUrl: '/mock/resume.pdf',
    content: 'Experienced software engineer with 5+ years in React, Node.js, and cloud technologies...',
    tags: ['Software Engineer', 'React', 'Node.js', 'AWS'],
    isActive: true,
    aiScore: 85,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId,
    name: 'Frontend Developer Resume',
    version: 2,
    fileName: 'john_doe_frontend_v2.pdf',
    fileUrl: '/mock/resume_frontend.pdf',
    content: 'Frontend specialist with expertise in React, TypeScript, and modern CSS frameworks...',
    tags: ['Frontend', 'React', 'TypeScript', 'CSS'],
    isActive: false,
    aiScore: 78,
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-15'),
  },
];

const generateMockCoverLetters = (userId: string): CoverLetter[] => [
  {
    id: '1',
    userId,
    name: 'Generic Tech Cover Letter',
    content: 'Dear Hiring Manager,\n\nI am excited to apply for the [Position] role at [Company]...',
    tags: ['Tech', 'Generic', 'Template'],
    isTemplate: true,
    tone: 'professional',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    userId,
    name: 'TechCorp Cover Letter',
    content: 'Dear Sarah Johnson,\n\nI am writing to express my strong interest in the Senior Frontend Developer position at TechCorp...',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    tags: ['TechCorp', 'Frontend', 'Personalized'],
    isTemplate: false,
    tone: 'friendly',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

export const useDocuments = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setResumes(generateMockResumes(user.id));
        setCoverLetters(generateMockCoverLetters(user.id));
        setLoading(false);
      }, 500);
    }
  }, [user]);

  const addResume = (resume: Omit<Resume, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    const newResume: Resume = {
      ...resume,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setResumes(prev => [newResume, ...prev]);
  };

  const updateResume = (id: string, updates: Partial<Resume>) => {
    setResumes(prev =>
      prev.map(resume =>
        resume.id === id
          ? { ...resume, ...updates, updatedAt: new Date() }
          : resume
      )
    );
  };

  const deleteResume = (id: string) => {
    setResumes(prev => prev.filter(resume => resume.id !== id));
  };

  const addCoverLetter = (coverLetter: Omit<CoverLetter, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    const newCoverLetter: CoverLetter = {
      ...coverLetter,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCoverLetters(prev => [newCoverLetter, ...prev]);
  };

  const updateCoverLetter = (id: string, updates: Partial<CoverLetter>) => {
    setCoverLetters(prev =>
      prev.map(letter =>
        letter.id === id
          ? { ...letter, ...updates, updatedAt: new Date() }
          : letter
      )
    );
  };

  const deleteCoverLetter = (id: string) => {
    setCoverLetters(prev => prev.filter(letter => letter.id !== id));
  };

  return {
    resumes,
    coverLetters,
    loading,
    addResume,
    updateResume,
    deleteResume,
    addCoverLetter,
    updateCoverLetter,
    deleteCoverLetter,
  };
};