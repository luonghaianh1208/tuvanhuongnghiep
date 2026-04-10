import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HollandResult from '../components/results/HollandResult';
import MBTIResult from '../components/results/MBTIResult';
import DISCResult from '../components/results/DISCResult';
import CombinedResult from '../components/results/CombinedResult';
import AIAnalysis from '../components/results/AIAnalysis';

import { getCombinedResults } from '../lib/scoring';
import { buildPrompt } from '../lib/gemini-api';
import { saveResult, getUserInfo } from '../lib/storage';

const USER_INFO_KEY = 'career_test_user_info';

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('holland');
  const [hollandResult, setHollandResult] = useState(null);
  const [mbtiResult, setMbtiResult] = useState(null);
  const [discResult, setDiscResult] = useState(null);
  const [combinedResults, setCombinedResults] = useState(null);
  const [savedAIAnalysis, setSavedAIAnalysis] = useState(null);
  const [currentResultId, setCurrentResultId] = useState(null);

  useEffect(() => {
    // Get results from location state
    if (location.state) {
      const { holland, mbti, disc, aiAnalysis, fromHistory } = location.state;
      setHollandResult(holland);
      setMbtiResult(mbti);
      setDiscResult(disc);

      // If viewing from history, use the saved AI analysis
      if (fromHistory && aiAnalysis) {
        setSavedAIAnalysis(aiAnalysis);
      }

      // Set active tab to the first available result
      if (holland) setActiveTab('holland');
      else if (mbti) setActiveTab('mbti');
      else if (disc) setActiveTab('disc');

      if (holland || mbti || disc) {
        const combined = getCombinedResults({ holland, mbti, disc });
        setCombinedResults(combined);

        // Only save to history if this is a NEW result (not viewing from history)
        if (!fromHistory) {
          const resultToSave = {
            testsCompleted: [
              holland ? 'holland' : null,
              mbti ? 'mbti' : null,
              disc ? 'disc' : null
            ].filter(Boolean),
            holland,
            mbti,
            disc,
            aiAnalysis: null
          };
          const savedId = saveResult(resultToSave);
          setCurrentResultId(savedId);
        }
      }
    }
  }, [location.state]);

  // Callback when AI analysis completes - save/update it in history
  const handleAIAnalysisComplete = async (analysisText) => {
    setSavedAIAnalysis(analysisText);

    // Update the saved result with AI analysis in localStorage only
    if (currentResultId) {
      import('../lib/storage').then(({ updateResultAIAnalysis }) => {
        updateResultAIAnalysis(currentResultId, analysisText);
      });
    }
  };

  const tabs = [];
  if (hollandResult) tabs.push({ id: 'holland', name: 'Holland RIASEC', color: 'blue' });
  if (mbtiResult) tabs.push({ id: 'mbti', name: 'MBTI', color: 'purple' });
  if (discResult) tabs.push({ id: 'disc', name: 'DISC', color: 'green' });
  if (tabs.length > 1) tabs.push({ id: 'combined', name: 'Tổng hợp', color: 'gold' });
  tabs.push({ id: 'ai', name: 'Phân tích AI', color: 'navy' });

  const contextPrompt = buildPrompt(hollandResult, mbtiResult, discResult);

  const getTabColor = (tab) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      purple: 'bg-purple-500 text-white',
      green: 'bg-green-500 text-white',
      gold: 'bg-gold text-navy',
      navy: 'bg-navy text-white'
    };
    return colors[tab.color] || 'bg-gray-500 text-white';
  };

  const hasResults = hollandResult || mbtiResult || discResult;

  if (!hasResults) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-be-vietnam text-gray-600 mb-4">Không tìm thấy kết quả</p>
          <button
            onClick={() => navigate('/select-test')}
            className="px-4 py-2 bg-navy text-white rounded-lg font-be-vietnam hover:bg-navy-light"
          >
            Làm bài test ngay
          </button>
        </div>
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
            {tabs.filter(t => t.id !== 'ai').length} bài test đã hoàn thành
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
                  ? getTabColor(tab)
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
                preSavedAnalysis={savedAIAnalysis}
                onAnalysisComplete={handleAIAnalysisComplete}
              />
              {/* Nút chia sẻ kết quả */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-be-vietnam font-bold text-lg text-navy mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Chia sẻ kết quả
                </h3>
                <p className="font-be-vietnam text-gray-500 text-sm mb-4">
                  Gửi kết quả trắc nghiệm cho bạn bè hoặc lưu lại để tham khảo sau.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const text = `Kết quả trắc nghiệm hướng nghiệp của tôi:\n` +
                        (hollandResult ? `Holland: ${hollandResult.code}\n` : '') +
                        (mbtiResult ? `MBTI: ${mbtiResult.type}\n` : '') +
                        (discResult ? `DISC: ${discResult.dominant}\n` : '') +
                        `\nLàm bài tại: ${window.location.origin}`;
                      if (navigator.share) {
                        navigator.share({ title: 'Kết quả hướng nghiệp', text });
                      } else {
                        navigator.clipboard.writeText(text);
                        alert('Đã sao chép kết quả vào clipboard!');
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-navy text-white font-be-vietnam font-medium rounded-lg hover:bg-navy-light transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Chia sẻ
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-navy font-be-vietnam font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    In kết quả
                  </button>
                </div>
              </div>
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

export default ResultPage;