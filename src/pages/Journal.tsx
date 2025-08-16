import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Target, TrendingUp, BookOpen, Edit, Trash2, Search, Filter, Star } from 'lucide-react';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  type: 'reflection' | 'goal' | 'achievement' | 'learning' | 'networking';
  mood: 'excited' | 'confident' | 'neutral' | 'frustrated' | 'motivated';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const mockEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'First Week of Job Searching',
    content: 'Started my job search journey today. Applied to 5 companies including TechCorp and StartupXYZ. Feeling optimistic about the opportunities ahead. Updated my resume and LinkedIn profile.',
    type: 'reflection',
    mood: 'excited',
    tags: ['job search', 'applications', 'resume'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Interview Preparation Goal',
    content: 'Set a goal to practice coding problems for 2 hours daily. Want to be ready for technical interviews. Planning to focus on algorithms and system design.',
    type: 'goal',
    mood: 'motivated',
    tags: ['interview prep', 'coding', 'goals'],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    title: 'Networking Success',
    content: 'Connected with 3 senior developers on LinkedIn today. Had a great coffee chat with Sarah from Google. She gave me valuable advice about the interview process.',
    type: 'networking',
    mood: 'confident',
    tags: ['networking', 'linkedin', 'mentorship'],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    title: 'Learned React Hooks',
    content: 'Completed an advanced React Hooks course today. Finally understand useCallback and useMemo properly. Built a small project to practice the concepts.',
    type: 'learning',
    mood: 'excited',
    tags: ['react', 'learning', 'hooks'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    title: 'First Interview Completed',
    content: 'Had my first technical interview with TechCorp. The coding challenge went well, but I struggled with the system design question. Need to practice more.',
    type: 'achievement',
    mood: 'neutral',
    tags: ['interview', 'techcorp', 'system design'],
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
  },
];

export const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const entryTypes = [
    { value: 'all', label: 'All Entries', icon: BookOpen, color: 'text-gray-600' },
    { value: 'reflection', label: 'Reflections', icon: BookOpen, color: 'text-blue-600' },
    { value: 'goal', label: 'Goals', icon: Target, color: 'text-green-600' },
    { value: 'achievement', label: 'Achievements', icon: Star, color: 'text-yellow-600' },
    { value: 'learning', label: 'Learning', icon: TrendingUp, color: 'text-purple-600' },
    { value: 'networking', label: 'Networking', icon: Calendar, color: 'text-orange-600' },
  ];

  const moodEmojis = {
    excited: '🚀',
    confident: '💪',
    neutral: '😐',
    frustrated: '😤',
    motivated: '🔥',
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  const thisWeekEntries = entries.filter(entry =>
    isWithinInterval(entry.createdAt, {
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date())
    })
  );

  const stats = {
    totalEntries: entries.length,
    thisWeek: thisWeekEntries.length,
    goals: entries.filter(e => e.type === 'goal').length,
    achievements: entries.filter(e => e.type === 'achievement').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Career Journal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Document your job search journey, goals, and achievements
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Entries"
          value={stats.totalEntries}
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="This Week"
          value={stats.thisWeek}
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Goals Set"
          value={stats.goals}
          icon={Target}
          color="purple"
        />
        <StatCard
          title="Achievements"
          value={stats.achievements}
          icon={Star}
          color="yellow"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries, tags, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2">
          {entryTypes.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === type.value
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className={`w-4 h-4 mr-2 ${type.color}`} />
                {type.label}
                <span className="ml-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-xs rounded-full">
                  {type.value === 'all' ? entries.length : entries.filter(e => e.type === type.value).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-6">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry, index) => (
            <JournalEntryCard
              key={entry.id}
              entry={entry}
              index={index}
              moodEmojis={moodEmojis}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No entries found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Start documenting your career journey'
              }
            </p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Entry
            </button>
          </div>
        )}
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <AddEntryModal
          onClose={() => setShowAddModal(false)}
          onAdd={(entry) => {
            setEntries(prev => [entry, ...prev]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

interface JournalEntryCardProps {
  entry: JournalEntry;
  index: number;
  moodEmojis: Record<string, string>;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, index, moodEmojis }) => {
  const typeColors = {
    reflection: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    goal: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    achievement: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    learning: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    networking: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {entry.title}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeColors[entry.type]}`}>
              {entry.type}
            </span>
            <span className="text-lg">
              {moodEmojis[entry.mood]}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {format(entry.createdAt, 'MMMM d, yyyy • h:mm a')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {entry.content}
      </p>

      <div className="flex flex-wrap gap-2">
        {entry.tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

interface AddEntryModalProps {
  onClose: () => void;
  onAdd: (entry: JournalEntry) => void;
}

const AddEntryModal: React.FC<AddEntryModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'reflection' as JournalEntry['type'],
    mood: 'neutral' as JournalEntry['mood'],
    tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: JournalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      content: formData.content,
      type: formData.type,
      mood: formData.mood,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onAdd(newEntry);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            New Journal Entry
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter a title for your entry"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as JournalEntry['type'] }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="reflection">Reflection</option>
                <option value="goal">Goal</option>
                <option value="achievement">Achievement</option>
                <option value="learning">Learning</option>
                <option value="networking">Networking</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mood
              </label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value as JournalEntry['mood'] }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="excited">🚀 Excited</option>
                <option value="confident">💪 Confident</option>
                <option value="neutral">😐 Neutral</option>
                <option value="frustrated">😤 Frustrated</option>
                <option value="motivated">🔥 Motivated</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Write about your experience, thoughts, or goals..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., interview, networking, learning"
            />
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Save Entry
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};