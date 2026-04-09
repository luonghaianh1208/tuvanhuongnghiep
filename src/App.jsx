import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import TestSelectPage from './pages/TestSelectPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 font-be-vietnam">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/select-test" element={<TestSelectPage />} />
            <Route path="/quiz/:testTypes" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;