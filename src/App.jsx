import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { PageSkeleton } from './components/LoadingSkeleton';

const HomePage = lazy(() => import('./pages/HomePage'));
const TestSelectPage = lazy(() => import('./pages/TestSelectPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
import UserInfoModal from './components/UserInfoModal';

const USER_INFO_KEY = 'career_test_user_info';

function App() {
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const savedInfo = localStorage.getItem(USER_INFO_KEY);
    if (!savedInfo) {
      setShowUserModal(true);
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 font-be-vietnam">
        <Navbar />
        <main className="flex-grow">
          {showUserModal && (
            <UserInfoModal
              onSubmit={(userInfo) => {
                console.log('User info saved:', userInfo);
                setShowUserModal(false);
              }}
            />
          )}
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/select-test" element={<TestSelectPage />} />
              <Route path="/quiz/:testTypes" element={<QuizPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;