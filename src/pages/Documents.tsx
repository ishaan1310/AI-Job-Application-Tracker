import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Upload, FileText, Download, Edit, Trash2, Star, Eye } from 'lucide-react';
import { useDocuments } from '../hooks/useDocuments';
import { Resume, CoverLetter } from '../types';
import { format } from 'date-fns';

export const Documents: React.FC = () => {
  const { resumes, coverLetters, loading, addResume, updateResume, deleteResume, addCoverLetter, updateCoverLetter, deleteCoverLetter } = useDocuments();
  const [activeTab, setActiveTab] = useState<'resumes' | 'cover-letters'>('resumes');
  const [showUploadModal, setShowUploadModal] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const handleSetActive = (resumeId: string) => {
    resumes.forEach(resume => {
      updateResume(resume.id, { isActive: resume.id === resumeId });
    });
  };

  const handleView = (document: Resume | CoverLetter) => {
    // Create a simple preview modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">${document.name}</h2>
            <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl">&times;</button>
          </div>
          <div class="prose dark:prose-invert max-w-none">
            <pre class="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">${document.content}</pre>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };

  const handleDownload = (document: Resume | CoverLetter) => {
    const element = document.createElement('a');
    const file = new Blob([document.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${document.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleEdit = (document: Resume | CoverLetter) => {
    // Create an edit modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto';
    
    modalContent.innerHTML = `
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Edit ${document.name}</h2>
          <button class="close-btn text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl">&times;</button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input type="text" class="name-input w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent" value="${document.name}">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
            <textarea class="content-input w-full h-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none">${document.content}</textarea>
          </div>
          <div class="flex items-center space-x-3">
            <button class="save-btn flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">Save Changes</button>
            <button class="cancel-btn flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modalContent.querySelector('.close-btn');
    const cancelBtn = modalContent.querySelector('.cancel-btn');
    const saveBtn = modalContent.querySelector('.save-btn');
    const nameInput = modalContent.querySelector('.name-input') as HTMLInputElement;
    const contentInput = modalContent.querySelector('.content-input') as HTMLTextAreaElement;
    
    const closeModal = () => modal.remove();
    
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    saveBtn?.addEventListener('click', () => {
      const updatedDocument = {
        ...document,
        name: nameInput.value,
        content: contentInput.value,
        updatedAt: new Date(),
      };
      
      if ('version' in document) {
        // It's a resume
        updateResume(document.id, updatedDocument);
      } else {
        // It's a cover letter
        updateCoverLetter(document.id, updatedDocument);
      }
      
      closeModal();
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Documents
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your resumes and cover letters
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowUploadModal(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('resumes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'resumes'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Resumes ({resumes.length})
            </button>
            <button
              onClick={() => setActiveTab('cover-letters')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'cover-letters'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Cover Letters ({coverLetters.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'resumes' ? (
            <ResumesList 
              resumes={resumes} 
              onSetActive={handleSetActive}
              onEdit={handleEdit}
              onView={handleView}
              onDownload={handleDownload}
              onDelete={deleteResume}
            />
          ) : (
            <CoverLettersList 
              coverLetters={coverLetters}
              onEdit={handleEdit}
              onView={handleView}
              onDownload={handleDownload}
              onDelete={deleteCoverLetter}
            />
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          onUpload={(type, data) => {
            if (type === 'resume') {
              addResume(data as any);
            } else {
              addCoverLetter(data as any);
            }
            setShowUploadModal(false);
          }}
        />
      )}
    </div>
  );
};

interface ResumesListProps {
  resumes: Resume[];
  onSetActive: (id: string) => void;
  onEdit: (resume: Resume) => void;
  onView: (resume: Resume) => void;
  onDownload: (resume: Resume) => void;
  onDelete: (id: string) => void;
}

const ResumesList: React.FC<ResumesListProps> = ({ resumes, onSetActive, onEdit, onView, onDownload, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumes.map((resume, index) => (
        <motion.div
          key={resume.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {resume.name}
                </h3>
                {resume.isActive && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Version {resume.version}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Updated {format(resume.updatedAt, 'MMM d, yyyy')}
              </p>
            </div>
            {resume.aiScore && (
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  AI Score
                </div>
                <div className={`text-lg font-bold ${
                  resume.aiScore >= 80 ? 'text-green-600' :
                  resume.aiScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {resume.aiScore}%
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {resume.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(resume)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onView(resume)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onDownload(resume)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(resume.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {!resume.isActive && (
              <button
                onClick={() => onSetActive(resume.id)}
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                Set Active
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

interface CoverLettersListProps {
  coverLetters: CoverLetter[];
  onEdit: (letter: CoverLetter) => void;
  onView: (letter: CoverLetter) => void;
  onDownload: (letter: CoverLetter) => void;
  onDelete: (id: string) => void;
}

const CoverLettersList: React.FC<CoverLettersListProps> = ({ coverLetters, onEdit, onView, onDownload, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coverLetters.map((letter, index) => (
        <motion.div
          key={letter.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate mb-2">
                {letter.name}
              </h3>
              {letter.jobTitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  For: {letter.jobTitle}
                </p>
              )}
              {letter.company && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Company: {letter.company}
                </p>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {format(letter.updatedAt, 'MMM d, yyyy')}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                letter.isTemplate 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {letter.isTemplate ? 'Template' : 'Custom'}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {letter.tone} tone
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {letter.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(letter)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onView(letter)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDownload(letter)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(letter.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

interface UploadModalProps {
  onClose: () => void;
  onUpload: (type: 'resume' | 'cover-letter', data: any) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [documentType, setDocumentType] = useState<'resume' | 'cover-letter'>('resume');
  const [formData, setFormData] = useState({
    name: '',
    tags: '',
    tone: 'professional',
    isTemplate: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      name: formData.name,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      version: 1,
      fileName: `${formData.name.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      fileUrl: '/mock/document.pdf',
      content: `Sample ${documentType} content for ${formData.name}.\n\nThis is a placeholder document that demonstrates the document management functionality.\n\nYou can edit this content using the edit button.\n\nKey sections:\n- Professional Summary\n- Work Experience\n- Skills\n- Education\n\nThis document can be customized to match your specific needs and requirements.`,
      isActive: false,
      ...(documentType === 'cover-letter' && {
        tone: formData.tone,
        isTemplate: formData.isTemplate,
      }),
    };

    onUpload(documentType, data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add Document
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
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as 'resume' | 'cover-letter')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="resume">Resume</option>
              <option value="cover-letter">Cover Letter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter document name"
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
              placeholder="e.g., Frontend, React, Senior"
            />
          </div>

          {documentType === 'cover-letter' && (
            <>
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isTemplate"
                  checked={formData.isTemplate}
                  onChange={(e) => setFormData(prev => ({ ...prev, isTemplate: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="isTemplate" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Save as template
                </label>
              </div>
            </>
          )}

          <div className="flex items-center space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Document
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