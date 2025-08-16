import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout/Layout';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Applications } from './pages/Applications';
import { Documents } from './pages/Documents';
import { AITools } from './pages/AITools';
import { Analytics } from './pages/Analytics';
import { Community } from './pages/Community';
import { Achievements } from './pages/Achievements';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Journal } from './pages/Journal';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/auth" replace />;
};

const AppRouter: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/dashboard" replace /> : <Auth />} 
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/ai-tools" element={<AITools />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/achievements" element={<Achievements />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: 'var(--toast-bg, #ffffff)',
              color: 'var(--toast-color, #374151)',
              border: '1px solid var(--toast-border, #e5e7eb)',
            },
            success: {
              duration: 1500,
            },
            error: {
              duration: 2500,
            },
          }}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}