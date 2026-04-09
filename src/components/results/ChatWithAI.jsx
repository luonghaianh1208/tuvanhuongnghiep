import React, { useState } from 'react';
import { callGeminiAPI, buildChatPrompt } from '../../lib/gemini-api.js';

function ChatWithAI({ contextPrompt }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const MAX_MESSAGES = 5;

  const handleSend = async () => {
    if (!input.trim() || messages.length >= MAX_MESSAGES) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    setError(null);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const conversationHistory = messages;
      const prompt = buildChatPrompt(contextPrompt, userMessage, conversationHistory);
      const response = await callGeminiAPI(prompt);

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setError(err.message);
      // Remove the user message if API failed
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const remainingMessages = MAX_MESSAGES - messages.length;

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
          <span className="font-be-vietnam text-sm bg-white/20 px-3 py-1 rounded-full">
            {remainingMessages} lượt còn lại
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && !loading && (
          <div className="text-center py-8">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="font-be-vietnam text-gray-500 text-sm">
              Hãy đặt câu hỏi về kết quả trắc nghiệm của bạn
            </p>
            <p className="font-be-vietnam text-gray-400 text-xs mt-2">
              Bạn có {MAX_MESSAGES} lượt chat miễn phí
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.role === 'user'
                  ? 'bg-navy text-white rounded-br-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="font-be-vietnam text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-xl rounded-bl-none">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-navy rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-navy rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-navy rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-200 p-3 rounded-xl">
              <p className="font-be-vietnam text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        {messages.length >= MAX_MESSAGES ? (
          <div className="text-center py-2">
            <p className="font-be-vietnam text-gray-500 text-sm">
              Bạn đã sử dụng hết {MAX_MESSAGES} lượt chat miễn phí
            </p>
            <p className="font-be-vietnam text-gray-400 text-xs mt-1">
              Cảm ơn bạn đã sử dụng dịch vụ!
            </p>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-be-vietnam text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-4 py-2 bg-navy text-white font-be-vietnam font-medium rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWithAI;