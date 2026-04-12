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
      try {
        const data = JSON.parse(saved);
        setAnswers(data.answers || {});
        setCurrentQuestionIndex(data.currentIndex || 0);
      } catch (e) {
        console.error('Error loading saved progress:', e);
      }
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

  const handleAnswer = (value) => {
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
        setResults(prev => ({
          ...prev,
          [currentTestType]: testResults,
          _rawAnswers: { ...(prev._rawAnswers || {}), [currentTestType]: { ...answers } }
        }));
        clearPartialResult(currentTestType);
        setCurrentTestIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
        setAnswers({});
      } else {
        // Finish all tests - navigate to result page with state
        const allResults = {
          ...results,
          [currentTestType]: calculateTestResults(currentTestType, answers),
          _rawAnswers: { ...(results._rawAnswers || {}), [currentTestType]: { ...answers } }
        };
        clearPartialResult(currentTestType);

        navigate('/result', {
          state: {
            holland: allResults.holland || null,
            mbti: allResults.mbti || null,
            disc: allResults.disc || null,
            rawAnswers: allResults._rawAnswers || null
          }
        });
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
      const groupedAnswers = { R: [], I: [], A: [], S: [], E: [], C: [] };
      hollandQuestions.forEach((q, idx) => {
        if (testAnswers[idx] !== undefined) {
          groupedAnswers[q.category].push(testAnswers[idx]);
        }
      });
      return calculateHolland(groupedAnswers);
    }

    if (testType === 'mbti') {
      const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      mbtiQuestions.forEach((q, idx) => {
        if (testAnswers[idx]) {
          counts[testAnswers[idx]]++;
        }
      });
      return calculateMBTI(counts);
    }

    if (testType === 'disc') {
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
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-white font-be-vietnam text-sm font-medium ${
            testInfo.color === 'blue' ? 'bg-blue-500' :
            testInfo.color === 'purple' ? 'bg-purple-500' :
            testInfo.color === 'green' ? 'bg-green-500' : 'bg-gray-500'
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

export default QuizPage;