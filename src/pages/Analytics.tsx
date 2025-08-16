import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Target, Clock, DollarSign, Users, Calendar, Award } from 'lucide-react';
import { useJobApplications } from '../hooks/useJobApplications';
import { useAnalytics } from '../hooks/useAnalytics';

export const Analytics: React.FC = () => {
  const { applications, loading } = useJobApplications();
  const analytics = useAnalytics(applications);
  const [timeRange, setTimeRange] = useState('6months');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your job search performance and identify trends
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Applications"
          value={analytics.totalApplications}
          change={`+${analytics.applicationsThisMonth} this month`}
          changeType="positive"
          icon={Target}
          color="blue"
        />
        <MetricCard
          title="Interview Rate"
          value={`${analytics.interviewRate.toFixed(1)}%`}
          change={analytics.interviewRate > 20 ? 'Above average' : 'Below average'}
          changeType={analytics.interviewRate > 20 ? 'positive' : 'negative'}
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Avg Response Time"
          value={`${analytics.avgResponseTime} days`}
          change="Industry standard"
          changeType="neutral"
          icon={Clock}
          color="purple"
        />
        <MetricCard
          title="Success Rate"
          value={`${analytics.offerRate.toFixed(1)}%`}
          change={analytics.offerRate > 5 ? 'Excellent!' : 'Keep going'}
          changeType={analytics.offerRate > 5 ? 'positive' : 'neutral'}
          icon={Award}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Application Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" fontSize={12} />
                <YAxis className="text-gray-600 dark:text-gray-400" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Application Status Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Companies */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Companies Applied
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.topCompanies} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" className="text-gray-600 dark:text-gray-400" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  className="text-gray-600 dark:text-gray-400" 
                  fontSize={12}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="count" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Success Funnel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Application Success Funnel
          </h3>
          <div className="space-y-4">
            <FunnelStep
              label="Applications Submitted"
              value={analytics.totalApplications}
              percentage={100}
              color="bg-blue-500"
            />
            <FunnelStep
              label="Responses Received"
              value={Math.round(analytics.totalApplications * 0.3)}
              percentage={30}
              color="bg-green-500"
            />
            <FunnelStep
              label="Interviews Scheduled"
              value={Math.round(analytics.totalApplications * analytics.interviewRate / 100)}
              percentage={analytics.interviewRate}
              color="bg-yellow-500"
            />
            <FunnelStep
              label="Offers Received"
              value={Math.round(analytics.totalApplications * analytics.offerRate / 100)}
              percentage={analytics.offerRate}
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Insights
          </h3>
          <div className="space-y-4">
            <InsightItem
              icon={TrendingUp}
              title="Interview Rate Trend"
              description={`Your interview rate is ${analytics.interviewRate.toFixed(1)}%, which is ${analytics.interviewRate > 20 ? 'above' : 'below'} the industry average of 20%.`}
              type={analytics.interviewRate > 20 ? 'positive' : 'negative'}
            />
            <InsightItem
              icon={Clock}
              title="Response Time"
              description={`Companies typically respond within ${analytics.avgResponseTime} days. Consider following up after this period.`}
              type="neutral"
            />
            <InsightItem
              icon={Target}
              title="Application Volume"
              description={`You've submitted ${analytics.applicationsThisMonth} applications this month. Consistency is key!`}
              type="positive"
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recommendations
          </h3>
          <div className="space-y-4">
            <RecommendationItem
              title="Optimize Application Quality"
              description="Focus on tailoring your resume and cover letter for each application to improve response rates."
              priority="high"
            />
            <RecommendationItem
              title="Follow Up Strategy"
              description="Implement a systematic follow-up process for applications older than 2 weeks."
              priority="medium"
            />
            <RecommendationItem
              title="Expand Your Network"
              description="Consider reaching out to employees at target companies through LinkedIn."
              priority="medium"
            />
          </div>
        </div>

        {/* Goals & Targets */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Goals & Targets
          </h3>
          <div className="space-y-4">
            <GoalItem
              title="Monthly Applications"
              current={analytics.applicationsThisMonth}
              target={20}
              unit="applications"
            />
            <GoalItem
              title="Interview Rate"
              current={analytics.interviewRate}
              target={25}
              unit="%"
            />
            <GoalItem
              title="Response Rate"
              current={30}
              target={40}
              unit="%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </p>
          <p className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
            changeType === 'negative' ? 'text-red-600 dark:text-red-400' :
            'text-gray-600 dark:text-gray-400'
          }`}>
            {change}
          </p>
        </div>
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

interface FunnelStepProps {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

const FunnelStep: React.FC<FunnelStepProps> = ({ label, value, percentage, color }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {value} ({percentage.toFixed(1)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`${color} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

interface InsightItemProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
}

const InsightItem: React.FC<InsightItemProps> = ({ icon: Icon, title, description, type }) => {
  const iconColors = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-blue-600 dark:text-blue-400',
  };

  return (
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-lg ${iconColors[type]} bg-opacity-10`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          {title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

interface RecommendationItemProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ title, description, priority }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  };

  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

interface GoalItemProps {
  title: string;
  current: number;
  target: number;
  unit: string;
}

const GoalItem: React.FC<GoalItemProps> = ({ title, current, target, unit }) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isAchieved = current >= target;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {current}/{target} {unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isAchieved ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {percentage.toFixed(0)}% complete
      </p>
    </div>
  );
};