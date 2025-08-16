import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Target, Zap, Calendar, Users, TrendingUp } from 'lucide-react';
import { useAchievements } from '../hooks/useAchievements';
import { useJobApplications } from '../hooks/useJobApplications';
import { useAuth } from '../contexts/AuthContext';
import Confetti from 'react-confetti';

export const Achievements: React.FC = () => {
  const { user } = useAuth();
  const { applications } = useJobApplications();
  const { achievements, newAchievements, checkAchievements, clearNewAchievements } = useAchievements();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (user && applications.length > 0) {
      const newlyEarned = checkAchievements(applications, {
        streakCount: user.streakCount || 0,
      });
      
      if (newlyEarned.length > 0) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          clearNewAchievements();
        }, 5000);
      }
    }
  }, [applications, user, checkAchievements, clearNewAchievements]);

  const earnedAchievements = achievements.filter(a => a.earned);
  const unlockedAchievements = achievements.filter(a => !a.earned);
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);

  const categories = [
    { id: 'milestone', name: 'Milestones', icon: Trophy, color: 'text-yellow-600' },
    { id: 'streak', name: 'Streaks', icon: Zap, color: 'text-orange-600' },
    { id: 'skill', name: 'Skills', icon: Star, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Achievements
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Track your progress and celebrate your job search milestones. 
          Every step forward is worth celebrating!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Points"
          value={totalPoints.toLocaleString()}
          icon={Award}
          color="bg-gradient-to-br from-yellow-400 to-orange-500"
        />
        <StatCard
          title="Achievements Earned"
          value={`${earnedAchievements.length}/${achievements.length}`}
          icon={Trophy}
          color="bg-gradient-to-br from-green-400 to-emerald-500"
        />
        <StatCard
          title="Current Streak"
          value={`${user?.streakCount || 0} days`}
          icon={Zap}
          color="bg-gradient-to-br from-orange-400 to-red-500"
        />
        <StatCard
          title="Progress"
          value={`${Math.round((earnedAchievements.length / achievements.length) * 100)}%`}
          icon={TrendingUp}
          color="bg-gradient-to-br from-blue-400 to-purple-500"
        />
      </div>

      {/* New Achievements Alert */}
      {newAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">
                🎉 New Achievement{newAchievements.length > 1 ? 's' : ''} Unlocked!
              </h3>
              <p className="text-yellow-100">
                {newAchievements.map(a => a.name).join(', ')}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Achievement Categories */}
      <div className="space-y-8">
        {categories.map(category => {
          const categoryAchievements = achievements.filter(a => a.type === category.id);
          const Icon = category.icon;

          return (
            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-8 h-8 ${category.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({categoryAchievements.filter(a => a.earned).length}/{categoryAchievements.length})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryAchievements.map((achievement, index) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    index={index}
                    isNew={newAchievements.some(na => na.id === achievement.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Overall Progress
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Achievement Progress
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {earnedAchievements.length} of {achievements.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(earnedAchievements.length / achievements.length) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {achievements.filter(a => a.type === 'milestone' && a.earned).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Milestones Reached
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {achievements.filter(a => a.type === 'streak' && a.earned).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Streaks Maintained
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {achievements.filter(a => a.type === 'skill' && a.earned).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Skills Developed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-hidden relative"
    >
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

interface AchievementCardProps {
  achievement: any;
  index: number;
  isNew: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index, isNew }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-4 rounded-lg border-2 transition-all ${
        achievement.earned
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
      } ${isNew ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}`}
    >
      {isNew && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
        >
          <span className="text-xs font-bold text-white">!</span>
        </motion.div>
      )}

      <div className="text-center">
        <div className={`text-4xl mb-3 ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
          {achievement.icon}
        </div>
        <h3 className={`font-semibold mb-2 ${
          achievement.earned 
            ? 'text-gray-900 dark:text-white' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {achievement.name}
        </h3>
        <p className={`text-sm mb-3 ${
          achievement.earned 
            ? 'text-gray-600 dark:text-gray-300' 
            : 'text-gray-400 dark:text-gray-500'
        }`}>
          {achievement.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            achievement.earned
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
          }`}>
            {achievement.points} pts
          </span>
          {achievement.earned && (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              ✓ Earned
            </span>
          )}
        </div>

        {!achievement.earned && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Progress: 0/{achievement.requirement}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-1">
              <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};