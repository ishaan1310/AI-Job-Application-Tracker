import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Upload, Bot, FileText, Calendar, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const quickActions = [
  {
    name: 'Add Job Application',
    description: 'Track a new job opportunity',
    icon: Plus,
    color: 'bg-primary-500 hover:bg-primary-600',
    path: '/applications',
    action: 'add',
  },
  {
    name: 'Upload Resume',
    description: 'Add or update your resume',
    icon: Upload,
    color: 'bg-green-500 hover:bg-green-600',
    path: '/documents',
    action: 'upload',
  },
  {
    name: 'AI Tools',
    description: 'Get AI-powered insights',
    icon: Bot,
    color: 'bg-purple-500 hover:bg-purple-600',
    path: '/ai-tools',
    action: 'navigate',
  },
  {
    name: 'Cover Letter',
    description: 'Create tailored cover letters',
    icon: FileText,
    color: 'bg-orange-500 hover:bg-orange-600',
    path: '/ai-tools',
    action: 'cover-letter',
  },
  {
    name: 'Schedule Interview',
    description: 'Add interview reminders',
    icon: Calendar,
    color: 'bg-blue-500 hover:bg-blue-600',
    path: '/applications',
    action: 'schedule',
  },
  {
    name: 'Set Goals',
    description: 'Track career objectives',
    icon: Target,
    color: 'bg-indigo-500 hover:bg-indigo-600',
    path: '/settings',
    action: 'navigate',
  },
];

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const handleActionClick = (action: any) => {
    switch (action.action) {
      case 'add':
        navigate(action.path, { state: { openAddModal: true } });
        break;
      case 'upload':
        navigate(action.path, { state: { openUploadModal: true } });
        break;
      case 'cover-letter':
        navigate(action.path, { state: { activeTab: 'cover-letter' } });
        break;
      case 'schedule':
        navigate(action.path, { state: { openScheduleModal: true } });
        break;
      default:
        navigate(action.path);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleActionClick(action)}
              className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {action.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {action.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};