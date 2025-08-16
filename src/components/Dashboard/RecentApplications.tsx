import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, DollarSign } from 'lucide-react';
import { JobApplication } from '../../types';
import { format } from 'date-fns';

interface RecentApplicationsProps {
  applications: JobApplication[];
}

const statusColors = {
  saved: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  interviewing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  offer: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  hired: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
};

export const RecentApplications: React.FC<RecentApplicationsProps> = ({ applications }) => {
  const recentApplications = applications
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Applications
        </h3>
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentApplications.map((application, index) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {application.jobTitle}
                </h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {application.company} • {application.location}
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {format(new Date(application.updatedAt), 'MMM d')}
                </span>
                {application.salary && (
                  <span className="flex items-center">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {application.salary.toLocaleString()}
                    {application.salaryMax && ` - ${application.salaryMax.toLocaleString()}`}
                  </span>
                )}
              </div>
            </div>
            {application.jobUrl && (
              <button className="ml-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {recentApplications.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No applications yet. Start by adding your first job application!
          </p>
        </div>
      )}
    </div>
  );
};