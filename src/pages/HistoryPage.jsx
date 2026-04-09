import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHistory, deleteHistory, deleteResultById } from '../lib/storage';

function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = getHistory();
    setHistory(data);
  };

  const handleDeleteAll = () => {
    deleteHistory();
    setHistory([]);
    setShowDeleteConfirm(false);
  };

  const handleDeleteOne = (e, id) => {
    e.stopPropagation(); // Prevent card click from firing
    deleteResultById(id);
    loadHistory();
  };

  const handleViewResult = (result) => {
    // Navigate to ResultPage with the saved data, marking it as history view
    navigate('/result', {
      state: {
        holland: result.holland || null,
        mbti: result.mbti || null,
        disc: result.disc || null,
        aiAnalysis: result.aiAnalysis || null,
        fromHistory: true // Flag to prevent re-saving
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTestBadge = (test) => {
    const badges = {
      holland: { text: 'Holland', color: 'bg-blue-100 text-blue-700' },
      mbti: { text: 'MBTI', color: 'bg-purple-100 text-purple-700' },
      disc: { text: 'DISC', color: 'bg-green-100 text-green-700' }
    };
    return badges[test] || { text: test, color: 'bg-gray-100 text-gray-700' };
  };

  const getResultSummary = (result) => {
    const parts = [];
    if (result.holland) parts.push(`Holland: ${result.holland.code}`);
    if (result.mbti) parts.push(`MBTI: ${result.mbti.type}`);
    if (result.disc) parts.push(`DISC: ${result.disc.style}`);
    return parts.join('  •  ');
  };

  const getDetailedInfo = (result) => {
    const info = [];
    if (result.holland) {
      const topGroups = result.holland.topGroups || [];
      if (topGroups.length > 0) {
        info.push(`Top nhóm: ${topGroups.map(g => g.name || g.code).join(', ')}`);
      }
    }
    if (result.mbti && result.mbti.profile) {
      info.push(result.mbti.profile.name);
    }
    if (result.disc) {
      const styleNames = {
        D: 'Thống trị', I: 'Ảnh hưởng', S: 'Ổn định', C: 'Cẩn thận'
      };
      const name = styleNames[result.disc.style] || result.disc.style;
      info.push(`Phong cách: ${name}`);
    }
    return info;
  };

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="font-be-vietnam font-bold text-xl sm:text-2xl md:text-3xl text-navy mb-1 sm:mb-2">
              Kết quả của tôi
            </h1>
            <p className="font-be-vietnam text-gray-600 text-sm sm:text-base">
              {history.length > 0
                ? `${history.length} lần làm bài • Bấm vào để xem chi tiết`
                : 'Lịch sử các lần làm bài trắc nghiệm'}
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-100 text-red-700 font-be-vietnam font-medium text-xs sm:text-sm rounded-lg hover:bg-red-200 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline">Xóa lịch sử</span>
              <span className="sm:hidden">Xóa</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {history.length === 0 && (
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 text-center">
            <svg className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="font-be-vietnam font-semibold text-lg text-gray-700 mb-2">
              Chưa có kết quả nào
            </h2>
            <p className="font-be-vietnam text-gray-500 mb-6 text-sm sm:text-base">
              Bạn chưa làm bài trắc nghiệm nào hoặc đã xóa lịch sử
            </p>
            <Link
              to="/select-test"
              className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-navy text-white font-be-vietnam font-medium rounded-xl hover:bg-navy-light transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Bắt đầu làm bài test
            </Link>
          </div>
        )}

        {/* History List */}
        {history.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            {history.map((result, index) => (
              <div
                key={result.id}
                onClick={() => handleViewResult(result)}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-lg hover:border-navy/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Date + Badge Row */}
                    <div className="flex items-center flex-wrap gap-2 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-be-vietnam text-xs sm:text-sm text-gray-500">
                          {formatDate(result.date)}
                        </span>
                      </div>
                      {index === 0 && (
                        <span className="px-2 py-0.5 bg-gold/20 text-gold-dark rounded-full font-be-vietnam text-[10px] sm:text-xs font-medium">
                          Mới nhất
                        </span>
                      )}
                    </div>

                    {/* Test Type Badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                      {result.testsCompleted.map((test) => {
                        const badge = getTestBadge(test);
                        return (
                          <span
                            key={test}
                            className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-be-vietnam text-xs font-medium ${badge.color}`}
                          >
                            {badge.text}
                          </span>
                        );
                      })}
                    </div>

                    {/* Result Summary */}
                    <p className="font-be-vietnam text-sm sm:text-base font-semibold text-navy mb-1">
                      {getResultSummary(result)}
                    </p>

                    {/* Detailed Info */}
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                      {getDetailedInfo(result).map((info, i) => (
                        <span key={i} className="font-be-vietnam text-[11px] sm:text-xs text-gray-500">
                          {info}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {/* View button */}
                    <div className="p-1.5 sm:p-2 text-navy/50 group-hover:text-navy transition-colors" title="Xem kết quả">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    {/* Delete button */}
                    <button
                      onClick={(e) => handleDeleteOne(e, result.id)}
                      className="p-1.5 sm:p-2 text-gray-300 hover:text-red-500 transition-colors"
                      title="Xóa"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-5 sm:p-6 max-w-md w-full">
              <h3 className="font-be-vietnam font-bold text-lg text-navy mb-3">
                Xóa lịch sử?
              </h3>
              <p className="font-be-vietnam text-gray-600 mb-6 text-sm sm:text-base">
                Bạn có chắc muốn xóa tất cả {history.length} kết quả? Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-be-vietnam font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="px-4 py-2 bg-red-600 text-white font-be-vietnam font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Xóa tất cả
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Storage Info */}
        <div className="mt-6 sm:mt-8 bg-gray-50 rounded-xl p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <h4 className="font-be-vietnam font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                Quyền riêng tư của bạn
              </h4>
              <p className="font-be-vietnam text-xs sm:text-sm text-gray-500 leading-relaxed">
                Kết quả được lưu trên thiết bị của bạn (localStorage). Không có dữ liệu nào được gửi lên server. 
                Hệ thống lưu tối đa 20 lần gần nhất, những kết quả cũ hơn sẽ tự động bị xóa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;