import { useState, useEffect } from 'react';
import { Achievement } from '../types';
import { useAuth } from '../contexts/AuthContext';

const allAchievements: Achievement[] = [
  {
    id: 'first-app',
    name: 'First Application',
    description: 'Submit your first job application',
    icon: '🎯',
    type: 'milestone',
    requirement: 1,
    points: 10,
    earned: null,
  },
  {
    id: 'app-streak-7',
    name: 'Week Warrior',
    description: 'Apply to jobs for 7 consecutive days',
    icon: '🔥',
    type: 'streak',
    requirement: 7,
    points: 50,
    earned: null,
  },
  {
    id: 'first-interview',
    name: 'Interview Ready',
    description: 'Land your first interview',
    icon: '🎤',
    type: 'milestone',
    requirement: 1,
    points: 25,
    earned: null,
  },
  {
    id: 'skill-master',
    name: 'Skill Master',
    description: 'Add 10 skills to your profile',
    icon: '🧠',
    type: 'skill',
    requirement: 10,
    points: 30,
    earned: null,
  },
  {
    id: 'networking-pro',
    name: 'Networking Pro',
    description: 'Connect with 5 mentors or coaches',
    icon: '🤝',
    type: 'milestone',
    requirement: 5,
    points: 40,
    earned: null,
  },
  {
    id: 'offer-received',
    name: 'Offer Champion',
    description: 'Receive your first job offer',
    icon: '🏆',
    type: 'milestone',
    requirement: 1,
    points: 100,
    earned: null,
  },
  {
    id: 'app-100',
    name: 'Century Club',
    description: 'Submit 100 job applications',
    icon: '💯',
    type: 'milestone',
    requirement: 100,
    points: 200,
    earned: null,
  },
  {
    id: 'interview-ace',
    name: 'Interview Ace',
    description: 'Complete 10 interviews',
    icon: '⭐',
    type: 'milestone',
    requirement: 10,
    points: 75,
    earned: null,
  },
];

export const useAchievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>(allAchievements);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (user?.achievements) {
      setAchievements(prev =>
        prev.map(achievement => ({
          ...achievement,
          earned: user.achievements.includes(achievement.id) ? new Date() : null,
        }))
      );
    }
  }, [user]);

  const checkAchievements = (applications: any[], userStats: any) => {
    const newlyEarned: Achievement[] = [];

    achievements.forEach(achievement => {
      if (achievement.earned) return;

      let earned = false;

      switch (achievement.id) {
        case 'first-app':
          earned = applications.length >= 1;
          break;
        case 'app-streak-7':
          earned = userStats.streakCount >= 7;
          break;
        case 'first-interview':
          earned = applications.some(app => ['interviewing', 'offer', 'hired'].includes(app.status));
          break;
        case 'skill-master':
          earned = (user?.skills?.length || 0) >= 10;
          break;
        case 'offer-received':
          earned = applications.some(app => ['offer', 'hired'].includes(app.status));
          break;
        case 'app-100':
          earned = applications.length >= 100;
          break;
        case 'interview-ace':
          earned = applications.filter(app => app.interviewDates.length > 0).length >= 10;
          break;
      }

      if (earned) {
        const updatedAchievement = { ...achievement, earned: new Date() };
        newlyEarned.push(updatedAchievement);
      }
    });

    if (newlyEarned.length > 0) {
      setNewAchievements(newlyEarned);
      setAchievements(prev =>
        prev.map(achievement => {
          const earned = newlyEarned.find(na => na.id === achievement.id);
          return earned ? earned : achievement;
        })
      );
    }

    return newlyEarned;
  };

  const clearNewAchievements = () => {
    setNewAchievements([]);
  };

  return {
    achievements,
    newAchievements,
    checkAchievements,
    clearNewAchievements,
  };
};