import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Calendar, Award } from 'lucide-react';
import { useJobApplications } from '../hooks/useJobApplications';
import { useAnalytics } from '../hooks/useAnalytics';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { QuickActions } from '../components/Dashboard/QuickActions';
import { RecentApplications } from '../components/Dashboard/RecentApplications';
import { ActivityChart } from '../components/Dashboard/ActivityChart';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { applications, loading } = useJobApplications();
  const analytics = useAnalytics(applications);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-primary-100">
          Here's your job search progress. You're doing great!
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={analytics.totalApplications}
          change={`+${analytics.applicationsThisMonth} this month`}
          changeType="positive"
          icon={Briefcase}
          color="blue"
        />
        <StatsCard
          title="Interview Rate"
          value={`${analytics.interviewRate.toFixed(1)}%`}
          change={analytics.interviewRate > 20 ? 'Above average' : 'Keep improving'}
          changeType={analytics.interviewRate > 20 ? 'positive' : 'neutral'}
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Response Time"
          value={`${analytics.avgResponseTime} days`}
          change="Average response"
          changeType="neutral"
          icon={Calendar}
          color="purple"
        />
        <StatsCard
          title="Success Rate"
          value={`${analytics.offerRate.toFixed(1)}%`}
          change={analytics.offerRate > 5 ? 'Excellent!' : 'Building momentum'}
          changeType={analytics.offerRate > 5 ? 'positive' : 'neutral'}
          icon={Award}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart analytics={analytics} />
        <RecentApplications applications={applications} />
      </div>
    </div>
  );
};