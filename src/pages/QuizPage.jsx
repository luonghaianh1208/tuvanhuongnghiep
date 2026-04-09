import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/quiz/QuestionCard';
import ProgressBar from '../components/quiz/ProgressBar';
import AnswerOptions from '../components/quiz/AnswerOptions';
import { hollandQuestions } from '../data/questions/holland-questions';
import { mbtiQuestions } from '../data/questions/mbti-questions';
import { discQuestions } from '../data/questions/disc-questions';
import { calculateHolland, calculateMBTI, calculateDISC } from '../lib/scoring';
import { savePartialResult, clearPartialResult } from '../lib/storage';

function QuizPage() {
  const { testTypes } = useParams();
  const navigate = useNavigate();

  const tests = testTypes ? testTypes.split(',') : [];

  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});

  // Get current test info
  const currentTestType = tests[currentTestIndex];
  const questions = useMemo(() => {
    if (currentTestType === 'holland') return hollandQuestions;
    if (currentTestType === 'mbti') return mbtiQuestions;
    if (currentTestType === 'disc') return discQuestions;
    return [];
  }, [currentTestType]);

  const testInfo = useMemo(() => {
    const info = {
      holland: { name: 'Holland RIASEC', color: 'blue' },
      mbti: { name: 'MBTI', color: 'purple' },
      disc: { name: 'DISC', color: 'green' }
    };
    return info[currentTestType] || { name: 'Unknown', color: 'gray' };
  }, [currentTestType]);

  // Load saved progress
  useEffect(() => {
    if (!currentTestType) return;

    const saved = localStorage.getItem(`career_test_partial_${currentTestType}`);
    if (saved) {
      const data = JSON.parse(saved);
      setAnswers(data.answers || {});
      setCurrentQuestionIndex(data.currentIndex || 0);
    }
  }, [currentTestType]);

  // Save progress on change
  useEffect(() => {
    if (currentTestType && Object.keys(answers).length > 0) {
      savePartialResult(currentTestType, {
        answers,
        currentIndex: currentQuestionIndex
      });
    }
  }, [answers, currentQuestionIndex, currentTestType]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestionsInTest = questions.length;
  const progress = ((currentTestIndex + (currentQuestionIndex + 1) / totalQuestionsInTest) / tests.length) * 100;

  const handleAnswer = (value) => {
    const key = currentQuestion.category || currentQuestion.type;
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestionsInTest - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to next test or finish
      if (currentTestIndex < tests.length - 1) {
        // Save current test answers and move to next
        const testResults = calculateTestResults(currentTestType, answers);
        setResults(prev => ({ ...prev, [currentTestType]: testResults }));
        clearPartialResult(currentTestType);
        setCurrentTestIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
        setAnswers({});
      } else {
        // Finish all tests
        const allResults = {
          ...results,
          [currentTestType]: calculateTestResults(currentTestType, answers)
        };
        clearPartialResult(currentTestType);
        setResults(allResults);
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentTestIndex > 0) {
      // Go to previous test's last question
      const prevTestType = tests[currentTestIndex - 1];
      const prevQuestions = getQuestionsForTest(prevTestType);
      setCurrentTestIndex(prev => prev - 1);
      setCurrentQuestionIndex(prevQuestions.length - 1);
      setAnswers({});
    }
  };

  const calculateTestResults = (testType, testAnswers) => {
    if (testType === 'holland') {
      // Convert answers array to grouped scores
      const groupedAnswers = { R: [], I: [], A: [], S: [], E: [], C: [] };
      hollandQuestions.forEach((q, idx) => {
        if (testAnswers[idx] !== undefined) {
          groupedAnswers[q.category].push(testAnswers[idx]);
        }
      });
      return calculateHolland(groupedAnswers);
    }

    if (testType === 'mbti') {
      // Count E/I, S/N, T/F, J/P
      const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      mbtiQuestions.forEach((q, idx) => {
        if (testAnswers[idx]) {
          counts[testAnswers[idx]]++;
        }
      });
      return calculateMBTI(counts);
    }

    if (testType === 'disc') {
      // Convert answers array to grouped scores
      const groupedAnswers = { D: [], I: [], S: [], C: [] };
      discQuestions.forEach((q, idx) => {
        if (testAnswers[idx] !== undefined) {
          groupedAnswers[q.category].push(testAnswers[idx]);
        }
      });
      return calculateDISC(groupedAnswers);
    }

    return null;
  };

  const getQuestionsForTest = (testType) => {
    if (testType === 'holland') return hollandQuestions;
    if (testType === 'mbti') return mbtiQuestions;
    if (testType === 'disc') return discQuestions;
    return [];
  };

  const currentAnswer = answers[currentQuestionIndex];

  // Show results
  if (showResults) {
    const hollandResult = results.holland;
    const mbtiResult = results.mbti;
    const discResult = results.disc;

    return (
      <ResultPage
        hollandResult={hollandResult}
        mbtiResult={mbtiResult}
        discResult={discResult}
      />
    );
  }

  if (!currentTestType || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-be-vietnam text-gray-600 mb-4">Không tìm thấy bài test</p>
          <button
            onClick={() => navigate('/select-test')}
            className="px-4 py-2 bg-navy text-white rounded-lg font-be-vietnam"
          >
            Quay lại chọn bài test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate('/select-test')}
              className="font-be-vietnam text-gray-500 hover:text-navy text-sm"
            >
              ← Quay lại
            </button>
            <span className="font-be-vietnam text-sm text-gray-500">
              Bài {currentTestIndex + 1} / {tests.length}
            </span>
          </div>
          <ProgressBar current={currentQuestionIndex + 1} total={totalQuestionsInTest} />
        </div>

        {/* Test Name */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-white font-be-vietnam text-sm font-medium bg-${
            testInfo.color === 'blue' ? 'blue-500' :
            testInfo.color === 'purple' ? 'purple-500' :
            testInfo.color === 'green' ? 'green-500' : 'gray-500'
          }`}>
            {testInfo.name}
          </span>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestionsInTest}
        >
          <AnswerOptions
            type={currentQuestion.type}
            selected={currentAnswer}
            onChange={handleAnswer}
            testType={currentTestType}
          />
        </QuestionCard>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentTestIndex === 0 && currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-xl font-be-vietnam font-medium transition-all ${
              currentTestIndex === 0 && currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-navy hover:bg-gray-300'
            }`}
          >
            ← Trước
          </button>
          <button
            onClick={handleNext}
            disabled={currentAnswer === undefined}
            className={`px-6 py-3 rounded-xl font-be-vietnam font-medium transition-all ${
              currentAnswer === undefined
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-navy text-white hover:bg-navy-light'
            }`}
          >
            {currentTestIndex === tests.length - 1 && currentQuestionIndex === totalQuestionsInTest - 1
              ? 'Xem kết quả'
              : 'Tiếp theo →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline ResultPage for now - will be replaced by actual ResultPage component
function ResultPage({ hollandResult, mbtiResult, discResult }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('holland');

  // Import components dynamically to avoid circular dependency
  const [HollandResult, setHollandResult] = useState(null);
  const [MBTIResult, setMBTIResult] = useState(null);
  const [DISCResult, setDISCResult] = useState(null);
  const [CombinedResult, setCombinedResult] = useState(null);
  const [AIAnalysis, setAIAnalysis] = useState(null);
  const [ChatWithAI, setChatWithAI] = useState(null);
  const [Combined, setCombined] = useState(null);

  useEffect(() => {
    // Lazy load components
    import('../components/results/HollandResult').then(m => setHollandResult(() => m.default));
    import('../components/results/MBTIResult').then(m => setMBTIResult(() => m.default));
    import('../components/results/DISCResult').then(m => setDISCResult(() => m.default));
    import('../components/results/CombinedResult').then(m => setCombinedResult(() => m.default));
    import('../components/results/AIAnalysis').then(m => setAIAnalysis(() => m.default));
    import('../components/results/ChatWithAI').then(m => setChatWithAI(() => m.default));
    import('../lib/scoring').then(m => setCombined(() => m.getCombinedResults));
  }, []);

  const { getCombinedResults } = require('../lib/scoring');
  const combinedResults = hollandResult || mbtiResult || discResult
    ? getCombinedResults({ holland: hollandResult, mbti: mbtiResult, disc: discResult })
    : null;

  const buildPrompt = require('../lib/gemini-api').buildPrompt;
  const contextPrompt = buildPrompt(hollandResult, mbtiResult, discResult);

  const tabs = [];
  if (hollandResult) tabs.push({ id: 'holland', name: 'Holland RIASEC', color: 'blue' });
  if (mbtiResult) tabs.push({ id: 'mbti', name: 'MBTI', color: 'purple' });
  if (discResult) tabs.push({ id: 'disc', name: 'DISC', color: 'green' });
  if (tabs.length > 1) tabs.push({ id: 'combined', name: 'Tổng hợp', color: 'gold' });
  tabs.push({ id: 'ai', name: 'Phân tích AI', color: 'navy' });

  if (!HollandResult || !MBTIResult || !DISCResult || !CombinedResult || !AIAnalysis || !ChatWithAI) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-be-vietnam font-bold text-2xl md:text-3xl text-navy mb-2">
            Kết quả trắc nghiệm của bạn
          </h1>
          <p className="font-be-vietnam text-gray-600">
            {tabs.length - 1} bài test đã hoàn thành
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-be-vietnam font-medium transition-colors ${
                activeTab === tab.id
                  ? tab.id === 'gold' ? 'bg-gold text-navy' :
                    tab.id === 'navy' ? 'bg-navy text-white' :
                    `bg-${tab.color}-500 text-white`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'holland' && hollandResult && (
            <HollandResult result={hollandResult} />
          )}
          {activeTab === 'mbti' && mbtiResult && (
            <MBTIResult result={mbtiResult} />
          )}
          {activeTab === 'disc' && discResult && (
            <DISCResult result={discResult} />
          )}
          {activeTab === 'combined' && combinedResults && (
            <CombinedResult results={combinedResults} />
          )}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <AIAnalysis
                hollandResult={hollandResult}
                mbtiResult={mbtiResult}
                discResult={discResult}
              />
              <ChatWithAI contextPrompt={contextPrompt} />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/select-test')}
            className="px-6 py-3 bg-gray-200 text-navy font-be-vietnam font-medium rounded-xl hover:bg-gray-300 transition-colors"
          >
            Làm bài test khác
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gold text-navy font-be-vietnam font-medium rounded-xl hover:bg-gold-dark transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;