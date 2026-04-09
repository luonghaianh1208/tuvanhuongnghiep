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

  const handleDeleteOne = (id) => {
    deleteResultById(id);
    loadHistory();
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
    if (result.holland) return `Mã Holland: ${result.holland.code}`;
    if (result.mbti) return `MBTI: ${result.mbti.type}`;
    if (result.disc) return `DISC: ${result.disc.style}`;
    return '';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-be-vietnam font-bold text-2xl md:text-3xl text-navy mb-2">
              Kết quả của tôi
            </h1>
            <p className="font-be-vietnam text-gray-600">
              Lịch sử các lần làm bài trắc nghiệm
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-100 text-red-700 font-be-vietnam font-medium rounded-lg hover:bg-red-200 transition-colors"
            >
              <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Xóa lịch sử
            </button>
          )}
        </div>

        {/* Empty State */}
        {history.length === 0 && (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="font-be-vietnam font-semibold text-lg text-gray-700 mb-2">
              Chưa có kết quả nào
            </h2>
            <p className="font-be-vietnam text-gray-500 mb-6">
              Bạn chưa làm bài trắc nghiệm nào hoặc đã xóa lịch sử
            </p>
            <Link
              to="/select-test"
              className="inline-flex items-center px-6 py-3 bg-navy text-white font-be-vietnam font-medium rounded-xl hover:bg-navy-light transition-colors"
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
          <div className="space-y-4">
            {history.map((result) => (
              <div
                key={result.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-be-vietnam text-sm text-gray-500">
                        {formatDate(result.date)}
                      </span>
                    </div>

                    {/* Test Types */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {result.testsCompleted.map((test) => {
                        const badge = getTestBadge(test);
                        return (
                          <span
                            key={test}
                            className={`px-3 py-1 rounded-full font-be-vietnam text-sm font-medium ${badge.color}`}
                          >
                            {badge.text}
                          </span>
                        );
                      })}
                    </div>

                    {/* Summary */}
                    <p className="font-be-vietnam text-gray-700">
                      {getResultSummary(result)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleDeleteOne(result.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Xóa"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <h3 className="font-be-vietnam font-bold text-lg text-navy mb-3">
                Xóa lịch sử?
              </h3>
              <p className="font-be-vietnam text-gray-600 mb-6">
                Bạn có chắc muốn xóa tất cả lịch sử kết quả? Hành động này không thể hoàn tác.
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

        {/* Privacy Note */}
        <div className="mt-8 bg-gray-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <h4 className="font-be-vietnam font-semibold text-gray-700 mb-1">
                Quyền riêng tư của bạn
              </h4>
              <p className="font-be-vietnam text-sm text-gray-500">
                Tất cả kết quả được lưu trong localStorage của trình duyệt này trên thiết bị của bạn.
                Không có dữ liệu nào được gửi lên server. Xóa dữ liệu trình duyệt sẽ xóa luôn lịch sử này.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;