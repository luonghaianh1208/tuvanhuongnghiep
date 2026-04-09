import React, { useState } from 'react';
import { callGeminiAPI, buildPrompt } from '../../lib/gemini-api.js';

function AIAnalysis({ hollandResult, mbtiResult, discResult, onAnalysisComplete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const prompt = buildPrompt(hollandResult, mbtiResult, discResult);
      const result = await callGeminiAPI(prompt);
      setAnalysis(result);
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderMarkdown = (text) => {
    // Simple markdown rendering
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="font-be-vietnam font-semibold text-lg text-navy mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="font-be-vietnam font-bold text-xl text-navy mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="font-be-vietnam font-bold text-2xl text-navy mt-6 mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="font-be-vietnam text-gray-700 mb-3">')
      .replace(/\n/g, '<br/>');

    return `<p class="font-be-vietnam text-gray-700 mb-3">${html}</p>`;
  };

  if (!analysis && !loading) {
    return (
      <div className="bg-gradient-to-r from-navy to-navy-light text-white rounded-xl p-6 text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <h3 className="font-be-vietnam font-bold text-xl mb-2">
          Phân tích chuyên sâu bằng AI
        </h3>
        <p className="font-be-vietnam text-gray-200 mb-4 text-sm">
          Nhận được lời khuyên cá nhân hóa từ chuyên gia AI về nghề nghiệp,
          lộ trình học tập và cách thích ứng với thời đại AI
        </p>
        <button
          onClick={handleAnalyze}
          className="inline-flex items-center px-6 py-3 bg-gold hover:bg-gold-dark text-navy font-be-vietnam font-semibold rounded-lg transition-colors shadow-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Bắt đầu phân tích AI (Miễn phí)
        </button>
        {error && (
          <p className="mt-4 text-red-300 font-be-vietnam text-sm">{error}</p>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <div className="mb-4">
          <div className="animate-spin w-12 h-12 mx-auto border-4 border-navy border-t-transparent rounded-full"></div>
        </div>
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-2">
          Đang phân tích...
        </h3>
        <p className="font-be-vietnam text-gray-500 text-sm">
          AI đang xem xét kết quả của bạn và đưa ra lời khuyên chuyên sâu
        </p>
        <div className="mt-4 space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-navy rounded-full animate-pulse w-3/4"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full animate-pulse w-1/2"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-navy rounded-full animate-pulse w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="font-be-vietnam font-semibold text-lg text-red-700 mb-2">
          Đã xảy ra lỗi
        </h3>
        <p className="font-be-vietnam text-red-600 text-sm mb-4">{error}</p>
        <button
          onClick={handleAnalyze}
          className="px-4 py-2 bg-red-600 text-white font-be-vietnam font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-be-vietnam font-bold text-xl text-navy">
          Phân tích chuyên sâu từ AI
        </h3>
        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full font-be-vietnam text-xs font-medium">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Hoàn thành
        </span>
      </div>
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(analysis) }}
      />
    </div>
  );
}

export default AIAnalysis;