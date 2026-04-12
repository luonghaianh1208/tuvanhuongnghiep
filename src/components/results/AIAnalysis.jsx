import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { callGeminiAPI, buildPrompt } from '../../lib/gemini-api.js';

function AIAnalysis({ hollandResult, mbtiResult, discResult, onAnalysisComplete, preSavedAnalysis, userCareers }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(preSavedAnalysis || null);

  // If we have pre-saved analysis, show it immediately without the button
  const hasPreSaved = !!preSavedAnalysis;

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const prompt = buildPrompt(hollandResult, mbtiResult, discResult, userCareers);
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

  // Map section number to color theme
  const getSectionTheme = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('điểm mạnh')) return { border: 'border-l-blue-500', bg: 'bg-blue-50', text: 'text-blue-800', icon: '💪' };
    if (lower.includes('nghề') && lower.includes('hợp')) return { border: 'border-l-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-800', icon: '🎯' };
    if (lower.includes('lộ trình')) return { border: 'border-l-amber-500', bg: 'bg-amber-50', text: 'text-amber-800', icon: '🗺️' };
    if (lower.includes('kỹ năng')) return { border: 'border-l-purple-500', bg: 'bg-purple-50', text: 'text-purple-800', icon: '🛠️' };
    if (lower.includes('rủi ro') || lower.includes('cảnh báo')) return { border: 'border-l-red-500', bg: 'bg-red-50', text: 'text-red-800', icon: '⚠️' };
    if (lower.includes('câu hỏi') || lower.includes('tự vấn')) return { border: 'border-l-teal-500', bg: 'bg-teal-50', text: 'text-teal-800', icon: '💡' };
    if (lower.includes('đánh giá') || lower.includes('ngành nghề đã chọn')) return { border: 'border-l-orange-500', bg: 'bg-orange-50', text: 'text-orange-800', icon: '🔍' };
    return { border: 'border-l-navy', bg: 'bg-gray-50', text: 'text-navy', icon: '📌' };
  };

  const renderMarkdown = (text) => {
    // Split into lines for more control
    const lines = text.split('\n');
    let html = '';
    let inSection = false;

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      // --- Horizontal rule ---
      if (/^---+$/.test(trimmed)) {
        if (inSection) { html += '</div>'; inSection = false; }
        html += '<hr class="my-5 border-t-2 border-dashed border-gray-200"/>';
        return;
      }

      // ## Heading - section start
      const h2Match = trimmed.match(/^##\s+(.+)$/);
      if (h2Match) {
        if (inSection) { html += '</div>'; }
        const theme = getSectionTheme(h2Match[1]);
        html += `<div class="rounded-xl ${theme.bg} border-l-4 ${theme.border} p-4 my-4">`;
        html += `<h2 class="font-be-vietnam font-bold text-lg ${theme.text} mb-3 flex items-center gap-2">`;
        html += `<span class="text-xl">${theme.icon}</span> ${h2Match[1]}</h2>`;
        inSection = true;
        return;
      }

      // ### Sub-heading
      const h3Match = trimmed.match(/^###\s+(.+)$/);
      if (h3Match) {
        html += `<h3 class="font-be-vietnam font-semibold text-base text-navy mt-3 mb-2">${h3Match[1]}</h3>`;
        return;
      }

      // # Main heading
      const h1Match = trimmed.match(/^#\s+(.+)$/);
      if (h1Match) {
        if (inSection) { html += '</div>'; inSection = false; }
        html += `<h1 class="font-be-vietnam font-bold text-xl text-navy mt-5 mb-3">${h1Match[1]}</h1>`;
        return;
      }

      // List item
      const listMatch = trimmed.match(/^[-•]\s+(.+)$/);
      if (listMatch) {
        let content = listMatch[1]
          // Bold text → tag/badge style
          .replace(/\*\*(.*?)\*\*/g, '<span class="inline-block bg-navy/10 text-navy font-semibold px-2 py-0.5 rounded-md text-sm mx-0.5">$1</span>')
          // Inline code
          .replace(/`(.*?)`/g, '<code class="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
        html += `<div class="flex items-start gap-2 mb-2 ml-1">`;
        html += `<svg class="w-4 h-4 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
        html += `<span class="font-be-vietnam text-gray-700 text-sm leading-relaxed">${content}</span>`;
        html += `</div>`;
        return;
      }

      // Empty line
      if (trimmed === '') {
        html += '<div class="h-2"></div>';
        return;
      }

      // Regular paragraph
      let content = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<span class="inline-block bg-navy/10 text-navy font-semibold px-2 py-0.5 rounded-md text-sm mx-0.5">$1</span>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
      html += `<p class="font-be-vietnam text-gray-700 text-sm leading-relaxed mb-2">${content}</p>`;
    });

    if (inSection) { html += '</div>'; }

    return DOMPurify.sanitize(html);
  };

  // Show pre-saved analysis directly, or show the button to generate new one
  if (hasPreSaved) {
    // Show the saved analysis content - same as the completed state
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
            Đã lưu
          </span>
        </div>
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(analysis) }}
        />
      </div>
    );
  }

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

      {/* AI Disclaimer */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-be-vietnam text-xs sm:text-sm text-amber-800 leading-relaxed">
              <strong>Miễn trừ trách nhiệm:</strong> Nội dung phân tích trên được tạo bởi trí tuệ nhân tạo (AI) dựa trên kết quả 
              trắc nghiệm của bạn. AI có thể mắc sai sót hoặc đưa ra thông tin không hoàn toàn chính xác. Thông tin về mức lương, 
              trường học và triển vọng nghề nghiệp chỉ mang tính chất tham khảo. Vui lòng xác minh lại thông tin và tham khảo 
              ý kiến chuyên gia tư vấn hướng nghiệp trước khi đưa ra quyết định quan trọng về nghề nghiệp và học tập.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIAnalysis;