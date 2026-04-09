import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TestSelectPage() {
  const navigate = useNavigate();
  const [selectedTests, setSelectedTests] = useState([]);

  const tests = [
    {
      id: 'holland',
      name: 'Holland RIASEC',
      questions: 42,
      duration: '15-20 phút',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      borderLight: 'border-blue-200',
      textDark: 'text-blue-700',
      description: 'Xác định 6 nhóm tính cách: Thực tế, Nghiên cứu, Nghệ thuật, Xã hội, Doanh nhân, Quy củ. Phù hợp để khám phá nghề nghiệp đa dạng.',
      benefits: [
        'Mã Holland 3 chữ cái độc đáo',
        'Gợi ý 10-15 nghề phù hợp',
        'Đánh giá triển vọng AI cho từng nghề'
      ]
    },
    {
      id: 'mbti',
      name: 'MBTI',
      questions: 60,
      duration: '20-25 phút',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      borderLight: 'border-purple-200',
      textDark: 'text-purple-700',
      description: 'Đo 4 chiều tính cách và xác định 1 trong 16 personality types. Giúp hiểu rõ bản thân và cách tương tác với người khác.',
      benefits: [
        'Mô tả tính cách chi tiết 150-200 chữ',
        '8 nghề phù hợp + 4 nghề cân nhắc',
        'Phong cách lãnh đạo và môi trường làm việc lý tưởng'
      ]
    },
    {
      id: 'disc',
      name: 'DISC',
      questions: 28,
      duration: '10-15 phút',
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      borderLight: 'border-green-200',
      textDark: 'text-green-700',
      description: 'Xác định phong cách làm việc: Thống trị, Ảnh hưởng, Ổn định, Cẩn thận. Phù hợp để cải thiện giao tiếp và làm việc nhóm.',
      benefits: [
        'Biểu đồ cột trực quan',
        '8 nghề phù hợp với phong cách',
        'Gợi ý môi trường làm việc lý tưởng'
      ]
    }
  ];

  const toggleTest = (testId) => {
    setSelectedTests(prev => {
      if (prev.includes(testId)) {
        return prev.filter(id => id !== testId);
      }
      return [...prev, testId];
    });
  };

  const handleStart = () => {
    if (selectedTests.length > 0) {
      navigate(`/quiz/${selectedTests.join(',')}`);
    }
  };

  const totalQuestions = selectedTests.reduce((sum, id) => {
    const test = tests.find(t => t.id === id);
    return sum + (test ? test.questions : 0);
  }, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-be-vietnam font-bold text-2xl md:text-3xl text-navy mb-3">
            Chọn bài trắc nghiệm
          </h1>
          <p className="font-be-vietnam text-gray-600">
            Bạn có thể chọn 1 hoặc nhiều bài test để nhận kết quả tổng hợp chính xác hơn
          </p>
        </div>

        {/* Test Cards */}
        <div className="space-y-4 mb-8">
          {tests.map((test) => {
            const isSelected = selectedTests.includes(test.id);
            return (
              <div
                key={test.id}
                onClick={() => toggleTest(test.id)}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 ${
                  isSelected
                    ? `border-${test.color}-500 bg-${test.color}-50 shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
                style={{
                  borderColor: isSelected ? undefined : undefined,
                  backgroundColor: isSelected ? undefined : undefined
                }}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isSelected
                    ? `bg-${test.color}-500 text-white`
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {isSelected && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Test Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-white font-be-vietnam font-semibold bg-gradient-to-r ${test.gradient}`}>
                        {test.name}
                      </div>
                      <span className="font-be-vietnam text-sm text-gray-500">
                        {test.questions} câu • {test.duration}
                      </span>
                    </div>
                    <p className="font-be-vietnam text-gray-600 mb-4">
                      {test.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {test.benefits.map((benefit, index) => (
                        <span key={index} className="inline-flex items-center text-xs text-gray-500">
                          <svg className={`w-4 h-4 mr-1 text-${test.color}-500`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {selectedTests.length > 0 && (
          <div className="bg-navy text-white rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-be-vietnam font-semibold">
                  Đã chọn: {selectedTests.length} bài test
                </span>
                <span className="font-be-vietnam text-gray-300 ml-2">
                  • Tổng cộng ~{totalQuestions} câu hỏi
                </span>
              </div>
              <span className="font-be-vietnam text-gold font-medium">
                {selectedTests.length > 1 ? 'Sẽ có phân tích tổng hợp' : 'Phân tích đơn lẻ'}
              </span>
            </div>
          </div>
        )}

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={handleStart}
            disabled={selectedTests.length === 0}
            className={`inline-flex items-center px-8 py-4 font-be-vietnam font-bold text-lg rounded-xl shadow-lg transition-all ${
              selectedTests.length > 0
                ? 'bg-gold hover:bg-gold-dark text-navy cursor-pointer transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {selectedTests.length > 0 ? 'Bắt đầu làm bài' : 'Chọn ít nhất 1 bài test'}
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gray-50 rounded-xl p-4">
          <h3 className="font-be-vietnam font-semibold text-navy mb-2">Mẹo để có kết quả chính xác:</h3>
          <ul className="font-be-vietnam text-sm text-gray-600 space-y-1">
            <li>• Chọn đáp án theo bản năng thật của bạn, không phải đáp án bạn nghĩ "đúng"</li>
            <li>• Không suy nghĩ quá lâu ở mỗi câu hỏi</li>
            <li>• Làm bài test ở nơi yên tĩnh để tập trung</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TestSelectPage;