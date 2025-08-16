import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MessageSquare, Heart, Share2, Filter, Search, TrendingUp, Users, Award, BookOpen } from 'lucide-react';
import { CommunityPost } from '../types';
import { format } from 'date-fns';

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah Chen',
    title: 'Just landed my dream job at Google! 🎉',
    content: 'After 6 months of preparation and 50+ applications, I finally got an offer from Google as a Senior Frontend Engineer. Here are the key things that helped me...',
    type: 'success',
    tags: ['Google', 'Frontend', 'Success Story'],
    likes: 124,
    replies: 23,
    isAnonymous: false,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Anonymous',
    title: 'How to negotiate salary effectively?',
    content: 'I have an offer but I think the salary is below market rate. What are some strategies to negotiate without losing the offer?',
    type: 'question',
    tags: ['Salary', 'Negotiation', 'Advice'],
    likes: 45,
    replies: 18,
    isAnonymous: true,
    createdAt: new Date('2024-01-19'),
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Mike Rodriguez',
    title: 'Best resources for system design interviews',
    content: 'Sharing a curated list of resources that helped me ace system design interviews at FAANG companies...',
    type: 'resource',
    tags: ['System Design', 'Interview', 'Resources'],
    likes: 89,
    replies: 12,
    isAnonymous: false,
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Anonymous',
    title: 'Feeling overwhelmed with job search',
    content: 'Been searching for 4 months with no luck. Getting rejections or no responses. How do you stay motivated?',
    type: 'advice',
    tags: ['Motivation', 'Job Search', 'Mental Health'],
    likes: 67,
    replies: 31,
    isAnonymous: true,
    createdAt: new Date('2024-01-17'),
  },
];

export const Community: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const tabs = [
    { id: 'all', name: 'All Posts', count: posts.length },
    { id: 'success', name: 'Success Stories', count: posts.filter(p => p.type === 'success').length },
    { id: 'question', name: 'Questions', count: posts.filter(p => p.type === 'question').length },
    { id: 'advice', name: 'Advice', count: posts.filter(p => p.type === 'advice').length },
    { id: 'resource', name: 'Resources', count: posts.filter(p => p.type === 'resource').length },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === 'all' || post.type === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Community
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with fellow job seekers, share experiences, and get advice
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreatePost(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </motion.button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Active Members"
          value="2,847"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Success Stories"
          value="156"
          icon={Award}
          color="green"
        />
        <StatCard
          title="Questions Answered"
          value="1,234"
          icon={MessageSquare}
          color="purple"
        />
        <StatCard
          title="Resources Shared"
          value="89"
          icon={BookOpen}
          color="orange"
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
                placeholder="Search posts, tags, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            index={index}
            onLike={handleLike}
          />
        ))}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
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

interface PostCardProps {
  post: CommunityPost;
  index: number;
  onLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, index, onLike }) => {
  const typeColors = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    question: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    advice: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    resource: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  };

  const typeIcons = {
    success: '🎉',
    question: '❓',
    advice: '💡',
    resource: '📚',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {post.isAnonymous ? '?' : post.userName.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {post.title}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeColors[post.type]}`}>
              {typeIcons[post.type]} {post.type}
            </span>
          </div>

          <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <span>{post.userName}</span>
            <span>•</span>
            <span>{format(post.createdAt, 'MMM d, yyyy')}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {post.content}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">{post.replies}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'question' as CommunityPost['type'],
    tags: '',
    isAnonymous: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post creation
    onClose();
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
            Create New Post
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
              Post Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as CommunityPost['type'] }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="question">Question</option>
              <option value="success">Success Story</option>
              <option value="advice">Advice</option>
              <option value="resource">Resource</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter a descriptive title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Share your thoughts, questions, or experiences..."
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
              placeholder="e.g., React, Interview, Salary"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAnonymous"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="isAnonymous" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Post anonymously
            </label>
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Create Post
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