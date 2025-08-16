import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, Download, Trash2, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'data', name: 'Data & Export', icon: Download },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'privacy' && <PrivacySettings />}
            {activeTab === 'appearance' && <AppearanceSettings />}
            {activeTab === 'data' && <DataSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSettings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    careerGoals: user?.careerGoals || '',
    skills: user?.skills?.join(', ') || '',
    preferredIndustries: user?.preferredIndustries?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      preferredIndustries: formData.preferredIndustries.split(',').map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Profile Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Career Goals
          </label>
          <textarea
            value={formData.careerGoals}
            onChange={(e) => setFormData(prev => ({ ...prev, careerGoals: e.target.value }))}
            className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Describe your career aspirations..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills (comma separated)
          </label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., React, Node.js, Python, AWS"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferred Industries (comma separated)
          </label>
          <input
            type="text"
            value={formData.preferredIndustries}
            onChange={(e) => setFormData(prev => ({ ...prev, preferredIndustries: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Technology, Finance, Healthcare"
          />
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </motion.button>
        </div>
      </form>
    </div>
  );
};

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    followUpReminders: true,
    interviewReminders: true,
    achievementNotifications: true,
    weeklyReports: true,
    communityUpdates: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Save notification preferences
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            General Notifications
          </h3>
          <div className="space-y-4">
            <ToggleOption
              label="Email Notifications"
              description="Receive notifications via email"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
            <ToggleOption
              label="Push Notifications"
              description="Receive browser push notifications"
              checked={settings.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
            />
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Job Search Reminders
          </h3>
          <div className="space-y-4">
            <ToggleOption
              label="Follow-up Reminders"
              description="Get reminded to follow up on applications"
              checked={settings.followUpReminders}
              onChange={() => handleToggle('followUpReminders')}
            />
            <ToggleOption
              label="Interview Reminders"
              description="Receive reminders about upcoming interviews"
              checked={settings.interviewReminders}
              onChange={() => handleToggle('interviewReminders')}
            />
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Progress & Community
          </h3>
          <div className="space-y-4">
            <ToggleOption
              label="Achievement Notifications"
              description="Get notified when you unlock achievements"
              checked={settings.achievementNotifications}
              onChange={() => handleToggle('achievementNotifications')}
            />
            <ToggleOption
              label="Weekly Reports"
              description="Receive weekly progress summaries"
              checked={settings.weeklyReports}
              onChange={() => handleToggle('weeklyReports')}
            />
            <ToggleOption
              label="Community Updates"
              description="Get notified about community posts and replies"
              checked={settings.communityUpdates}
              onChange={() => handleToggle('communityUpdates')}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const PrivacySettings: React.FC = () => {
  const [settings, setSettings] = useState({
    profileVisibility: 'private',
    shareAnalytics: false,
    allowMentorContact: true,
    showInCommunity: true,
  });

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Privacy & Security
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Profile Visibility
          </label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => setSettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="private">Private</option>
            <option value="mentors">Visible to Mentors Only</option>
            <option value="community">Visible to Community</option>
            <option value="public">Public</option>
          </select>
        </div>

        <ToggleOption
          label="Share Anonymous Analytics"
          description="Help improve the platform by sharing anonymous usage data"
          checked={settings.shareAnalytics}
          onChange={() => setSettings(prev => ({ ...prev, shareAnalytics: !prev.shareAnalytics }))}
        />

        <ToggleOption
          label="Allow Mentor Contact"
          description="Allow career coaches and mentors to contact you"
          checked={settings.allowMentorContact}
          onChange={() => setSettings(prev => ({ ...prev, allowMentorContact: !prev.allowMentorContact }))}
        />

        <ToggleOption
          label="Show in Community"
          description="Display your profile in community member listings"
          checked={settings.showInCommunity}
          onChange={() => setSettings(prev => ({ ...prev, showInCommunity: !prev.showInCommunity }))}
        />

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
            Data Protection
          </h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Your personal data is encrypted and stored securely. We never share your information with third parties without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
};

const AppearanceSettings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Appearance
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Theme
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`p-4 border-2 rounded-lg transition-all ${
                theme === 'light'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="w-full h-20 bg-white border border-gray-200 rounded mb-2"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
            </button>
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`p-4 border-2 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="w-full h-20 bg-gray-800 border border-gray-700 rounded mb-2"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timezone
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="UTC-8">Pacific Time (UTC-8)</option>
            <option value="UTC-5">Eastern Time (UTC-5)</option>
            <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
            <option value="UTC+1">Central European Time (UTC+1)</option>
            <option value="UTC+5:30">India Standard Time (UTC+5:30)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const DataSettings: React.FC = () => {
  const handleExportData = () => {
    // Create sample data export
    const data = {
      profile: {
        name: 'Demo User',
        email: 'demo@jobtrackerpro.com',
        location: 'Demo City',
      },
      applications: [
        { company: 'TechCorp', position: 'Frontend Developer', status: 'applied' },
        { company: 'StartupXYZ', position: 'React Developer', status: 'interviewing' },
      ],
      documents: [
        { name: 'Software Engineer Resume', type: 'resume' },
        { name: 'Generic Tech Cover Letter', type: 'cover-letter' },
      ],
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'job-tracker-data-export.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion is not available in demo mode.');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Data Management
      </h2>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
            Export Your Data
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-400 mb-4">
            Download a copy of all your data including applications, documents, and analytics.
          </p>
          <button
            onClick={handleExportData}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h3 className="font-medium text-red-900 dark:text-red-300 mb-2">
            Delete Account
          </h3>
          <p className="text-sm text-red-800 dark:text-red-400 mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Data Usage
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Applications:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">5 records</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Documents:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">3 files</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Storage Used:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">2.4 MB</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Account Age:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToggleOptionProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};