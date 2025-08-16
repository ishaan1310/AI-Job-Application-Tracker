import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, FileText, MessageSquare, Target, Zap, Upload, Download, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('resume-matcher');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const tools = [
    {
      id: 'resume-matcher',
      name: 'Resume-JD Matcher',
      description: 'Analyze resume against job descriptions',
      icon: Target,
      color: 'bg-blue-500',
    },
    {
      id: 'cover-letter',
      name: 'Cover Letter Generator',
      description: 'Create tailored cover letters',
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      id: 'interview-prep',
      name: 'Interview Prep',
      description: 'Practice with AI-generated questions',
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
    {
      id: 'skill-gap',
      name: 'Skill Gap Analyzer',
      description: 'Identify missing skills and get recommendations',
      icon: Zap,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI-Powered Career Tools
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Leverage artificial intelligence to optimize your job search, improve your applications, 
          and increase your chances of landing your dream job.
        </p>
      </div>

      {/* Tool Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tool.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  activeTab === tool.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Tool Content */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          {activeTab === 'resume-matcher' && <ResumeMatcher />}
          {activeTab === 'cover-letter' && <CoverLetterGenerator />}
          {activeTab === 'interview-prep' && <InterviewPrep />}
          {activeTab === 'skill-gap' && <SkillGapAnalyzer />}
        </div>
      </div>
    </div>
  );
};

const ResumeMatcher: React.FC = () => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        // Simulate PDF text extraction
        setResume(`Extracted content from ${file.name}:

John Doe
Software Engineer

EXPERIENCE
Senior Frontend Developer | TechCorp | 2020-2023
• Developed and maintained React applications serving 100k+ users
• Led a team of 4 developers in implementing new features
• Improved application performance by 40% through optimization
• Collaborated with UX/UI designers to implement responsive designs

Frontend Developer | StartupXYZ | 2018-2020
• Built responsive web applications using React, JavaScript, and CSS
• Integrated RESTful APIs and third-party services
• Participated in agile development processes
• Mentored junior developers

SKILLS
• JavaScript, TypeScript, React, Node.js
• HTML5, CSS3, SASS, Tailwind CSS
• Git, Docker, AWS, MongoDB
• Agile/Scrum methodologies

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2014-2018`);
      } else if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setResume(e.target?.result as string);
        };
        reader.readAsText(file);
      } else {
        alert('Please upload a PDF or text file');
      }
    }
  };

  const handleAnalyze = async () => {
    if (!resume || !jobDescription) {
      alert('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        matchScore: 78,
        strengths: [
          'Strong technical skills alignment',
          'Relevant experience in React and Node.js',
          'Good educational background match',
        ],
        improvements: [
          'Add more cloud computing experience',
          'Include specific project metrics',
          'Highlight leadership experience',
        ],
        missingKeywords: ['AWS', 'Docker', 'Kubernetes', 'Agile'],
        recommendations: [
          'Emphasize your experience with modern JavaScript frameworks',
          'Add quantifiable achievements to your work experience',
          'Include relevant certifications or courses',
        ],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Resume Content
          </label>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume content here..."
            className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
          <div className="mt-2 flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.txt"
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <Upload className="w-4 h-4 mr-1" />
              Upload Resume File
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Supports PDF and TXT files
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </div>
          ) : (
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze Match
            </div>
          )}
        </motion.button>
      </div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
        >
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {analysis.matchScore}%
            </div>
            <p className="text-gray-600 dark:text-gray-400">Match Score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Strengths
              </h4>
              <ul className="space-y-2">
                {analysis.strengths.map((strength: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Areas for Improvement
              </h4>
              <ul className="space-y-2">
                {analysis.improvements.map((improvement: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                    <span className="text-orange-500 mr-2">!</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Missing Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.missingKeywords.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const CoverLetterGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    hiringManager: '',
    tone: 'professional',
    keyPoints: '',
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!formData.jobTitle || !formData.company) {
      alert('Please provide job title and company name');
      return;
    }

    setLoading(true);

    // Simulate AI generation
    setTimeout(() => {
      const letter = `Dear ${formData.hiringManager || 'Hiring Manager'},

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.company}. With my background in software development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

In my previous roles, I have developed expertise in modern web technologies including React, Node.js, and cloud platforms. I am particularly drawn to ${formData.company} because of your commitment to innovation and excellence in the technology space.

${formData.keyPoints ? `Additionally, I would like to highlight: ${formData.keyPoints}` : ''}

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to ${formData.company}'s continued success. Thank you for considering my application.

Best regards,
[Your Name]`;

      setGeneratedLetter(letter);
      setLoading(false);
    }, 1500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${formData.company.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Senior Frontend Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., TechCorp Inc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hiring Manager (Optional)
            </label>
            <input
              type="text"
              value={formData.hiringManager}
              onChange={(e) => setFormData(prev => ({ ...prev, hiringManager: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Sarah Johnson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="bold">Bold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Key Points to Highlight
            </label>
            <textarea
              value={formData.keyPoints}
              onChange={(e) => setFormData(prev => ({ ...prev, keyPoints: e.target.value }))}
              className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Specific achievements, skills, or experiences to emphasize..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading}
            className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Cover Letter
              </div>
            )}
          </motion.button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Generated Cover Letter
            </label>
            {generatedLetter && (
              <button 
                onClick={handleDownload}
                className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            )}
          </div>
          <textarea
            value={generatedLetter}
            onChange={(e) => setGeneratedLetter(e.target.value)}
            className="w-full h-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Your generated cover letter will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

const InterviewPrep: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('frontend-developer');
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const roles = [
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'fullstack-developer', label: 'Full Stack Developer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'product-manager', label: 'Product Manager' },
  ];

  const generateQuestions = () => {
    const mockQuestions = [
      {
        id: 1,
        question: "Tell me about yourself and your experience with React.",
        type: 'behavioral',
        difficulty: 'easy',
        category: 'Introduction',
      },
      {
        id: 2,
        question: "How do you handle state management in large React applications?",
        type: 'technical',
        difficulty: 'medium',
        category: 'React',
      },
      {
        id: 3,
        question: "Describe a challenging project you worked on and how you overcame obstacles.",
        type: 'behavioral',
        difficulty: 'medium',
        category: 'Problem Solving',
      },
      {
        id: 4,
        question: "Explain the difference between useMemo and useCallback hooks.",
        type: 'technical',
        difficulty: 'hard',
        category: 'React Hooks',
      },
      {
        id: 5,
        question: "How do you stay updated with the latest frontend technologies?",
        type: 'behavioral',
        difficulty: 'easy',
        category: 'Learning',
      },
    ];

    setQuestions(mockQuestions);
    setCurrentQuestion(0);
    setUserAnswer('');
    setFeedback('');
  };

  const submitAnswer = () => {
    if (!userAnswer.trim()) {
      alert('Please provide an answer');
      return;
    }

    // Simulate AI feedback
    const mockFeedback = "Good answer! You demonstrated understanding of the concept. To improve, consider adding specific examples from your experience and mentioning best practices.";
    setFeedback(mockFeedback);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setFeedback('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {roles.map(role => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="flex items-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateQuestions}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Generate Questions
          </motion.button>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                questions[currentQuestion].type === 'technical'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {questions[currentQuestion].type}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                questions[currentQuestion].difficulty === 'easy'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : questions[currentQuestion].difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {questions[currentQuestion].difficulty}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-900 dark:text-white mb-4">
              {questions[currentQuestion].question}
            </p>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Type your answer here..."
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={submitAnswer}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Submit Answer
            </button>
            {feedback && currentQuestion < questions.length - 1 && (
              <button
                onClick={nextQuestion}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Next Question
              </button>
            )}
          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                AI Feedback
              </h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                {feedback}
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

const SkillGapAnalyzer: React.FC = () => {
  const [targetRole, setTargetRole] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!targetRole || !currentSkills) {
      alert('Please provide target role and current skills');
      return;
    }

    setLoading(true);

    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        missingSkills: [
          { skill: 'Docker', priority: 'high', resources: ['Docker Official Tutorial', 'Kubernetes Course'] },
          { skill: 'AWS', priority: 'high', resources: ['AWS Certified Developer', 'Cloud Practitioner'] },
          { skill: 'GraphQL', priority: 'medium', resources: ['GraphQL Tutorial', 'Apollo Client Guide'] },
          { skill: 'TypeScript', priority: 'medium', resources: ['TypeScript Handbook', 'Advanced TypeScript'] },
        ],
        strengthSkills: ['React', 'JavaScript', 'Node.js', 'CSS'],
        recommendations: [
          'Focus on containerization technologies (Docker, Kubernetes)',
          'Gain cloud platform experience, particularly AWS',
          'Learn modern API technologies like GraphQL',
          'Strengthen TypeScript knowledge for better code quality',
        ],
        learningPath: [
          { week: 1, focus: 'Docker Fundamentals', resources: 2 },
          { week: 2, focus: 'AWS Basics', resources: 3 },
          { week: 3, focus: 'Kubernetes Introduction', resources: 2 },
          { week: 4, focus: 'GraphQL & Apollo', resources: 2 },
        ],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Role
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Senior Full Stack Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Skills (comma separated)
          </label>
          <input
            type="text"
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., React, JavaScript, Node.js, CSS, HTML"
          />
        </div>
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </div>
          ) : (
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Analyze Skill Gap
            </div>
          )}
        </motion.button>
      </div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Missing Skills */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-4">
              Skills to Develop
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.missingSkills.map((item: any, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {item.skill}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.priority === 'high'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {item.priority} priority
                    </span>
                  </div>
                  <div className="space-y-1">
                    {item.resources.map((resource: string, idx: number) => (
                      <a
                        key={idx}
                        href="#"
                        className="block text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        📚 {resource}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strength Skills */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-4">
              Your Strengths
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.strengthSkills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
              Recommended Learning Path
            </h3>
            <div className="space-y-3">
              {analysis.learningPath.map((week: any, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {week.week}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {week.focus}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {week.resources} recommended resources
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};