
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import ChatbotButton from './components/ChatbotButton';
import Home from './pages/Home';
import Services from './pages/Services';
import Onboarding from './pages/Onboarding';
import Agencies from './pages/Agencies';
import Help from './pages/Help';
import About from './pages/About';
import Login from './pages/Login';
import './styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/agencies" element={<Agencies />} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <ChatbotButton />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
