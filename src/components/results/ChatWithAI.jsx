import React from 'react';

function ChatWithAI({ contextPrompt }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-navy text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span className="font-be-vietnam font-semibold">Chat với AI</span>
          </div>
          <span className="font-be-vietnam text-xs bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full">
            🔒 Tạm khóa
          </span>
        </div>
      </div>

      {/* Locked Content */}
      <div className="p-6 sm:p-8 text-center bg-gray-50">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h3 className="font-be-vietnam font-bold text-lg text-navy mb-2">
          Tính năng đang phát triển
        </h3>
        <p className="font-be-vietnam text-gray-600 text-sm mb-4 max-w-md mx-auto leading-relaxed">
          Chức năng chat trực tiếp với AI đang được phát triển và sẽ ra mắt trong thời gian tới. 
          Hiện tại bạn có thể sử dụng tính năng <strong className="text-navy">Phân tích chuyên sâu bằng AI</strong> ở phía trên.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-be-vietnam text-xs font-semibold text-navy">Sắp ra mắt</span>
          </div>
          <ul className="font-be-vietnam text-xs text-gray-500 text-left space-y-1">
            <li>• Chat trực tiếp với AI về kết quả</li>
            <li>• Hỏi đáp về lộ trình học tập</li>
            <li>• Tư vấn chuyên sâu cá nhân hóa</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChatWithAI;