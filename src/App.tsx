import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { BottomNav } from './components/layout/BottomNav';
import { AIAssistant } from './components/ui/AIAssistant';
import { Sparkles } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <img src="/src/assets/images/ai_drama_logo_1793969571216.jpg" alt="Loading" className="w-24 h-24 rounded-3xl animate-pulse shadow-[0_0_40px_rgba(255,212,0,0.4)]" />
        <div className="mt-8 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-black glow-text animate-pulse">AI DRAMA</h1>
          <p className="text-muted text-xs uppercase tracking-[0.2em]">Watch • Enjoy • Feel the Drama</p>
        </div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Routes>
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">
                <Home />
              </main>
              <BottomNav />
              <AIAssistant />
            </div>
          </ProtectedRoute>
        } />
        
        {/* Fallback routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
