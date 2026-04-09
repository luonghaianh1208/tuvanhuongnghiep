import React from 'react';

function AnswerOptions({ type, selected, onChange, testType }) {
  // Holland and DISC: 5-point scale
  if (testType === 'holland' || testType === 'disc') {
    const options = [
      { value: 5, label: 'Rất thích', color: 'bg-green-500 hover:bg-green-600 border-green-500' },
      { value: 4, label: 'Thích', color: 'bg-green-400 hover:bg-green-500 border-green-400' },
      { value: 3, label: 'Bình thường', color: 'bg-yellow-400 hover:bg-yellow-500 border-yellow-400' },
      { value: 2, label: 'Không thích', color: 'bg-orange-400 hover:bg-orange-500 border-orange-400' },
      { value: 1, label: 'Rất không thích', color: 'bg-red-500 hover:bg-red-600 border-red-500' }
    ];

    return (
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full p-4 rounded-xl font-be-vietnam text-left transition-all duration-200 border-2 ${
              selected === option.value
                ? `${option.color} text-white shadow-md transform scale-[1.02]`
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                selected === option.value ? 'border-white' : 'border-gray-400'
              }`}>
                {selected === option.value && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              <span className="font-medium">{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    );
  }

  // MBTI: 2 options
  if (testType === 'mbti') {
    return (
      <div className="space-y-4">
        {type === 'EI' && (
          <>
            <button
              onClick={() => onChange('E')}
              className={`w-full p-5 rounded-xl font-be-vietnam text-left transition-all duration-200 border-2 ${
                selected === 'E'
                  ? 'bg-navy border-navy text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-navy hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selected === 'E' ? 'border-white bg-gold text-navy' : 'border-navy'
                }`}>
                  E
                </span>
                <div>
                  <div className="font-semibold">Hướng ngoại (Extraversion)</div>
                  <div className="text-sm opacity-80">
                    Năng lượng từ bên ngoài, thích giao tiếp, hành động nhanh
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={() => onChange('I')}
              className={`w-full p-5 rounded-xl font-be-vietnam text-left transition-all duration-200 border-2 ${
                selected === 'I'
                  ? 'bg-navy border-navy text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-navy hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selected === 'I' ? 'border-white bg-gold text-navy' : 'border-navy'
                }`}>
                  I
                </span>
                <div>
                  <div className="font-semibold">Hướng nội (Introversion)</div>
                  <div className="text-sm opacity-80">
                    Năng lượng từ bên trong, thích suy nghĩ, hành động có cân nhắc
                  </div>
                </div>
              </div>
            </button>
          </>
        )}
        {type === 'SN' && (
          <>
            <button
              onClick={() => onChange('S')}
              className={`w-full p-5 rounded-xl font-be-vietnam text-left transition-all duration-200 border-2 ${
                selected === 'S'
                  ? 'bg-navy border-navy text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-navy hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selected === 'S' ? 'border-white bg-gold text-navy' : 'border-navy'
                }`}>
                  S
                </span>
                <div>
                  <div className="font-semibold">Giác quan (Sensing)</div>
                  <div className="text-sm opacity-80">
                    Tập trung vào thực tế, chi tiết, kinh nghiệm
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={() => onChange('N')}
              className={`w-full p-5 rounded-xl font-be-vietnam text-left transition-all duration-200 border-2 ${
                selected === 'N'
                  ? 'bg-navy border-navy text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-navy hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selected === 'N' ? 'border-white bg-gold text-navy' : 'border-navy'
                }`}>
                  N
                </span>
                <div>
                  <div className="font-semibold">Trực giác (Intuition)</div>
                  <div className="text-sm opacity-80">
                    Tập trung vào khả năng, mẫu hình, tương lai
                  </div>
                </div>
              </div>
            </button>
          </>
        )}
        {type === 'TF' && (
          <>
            <button
              onClick={() => onChange('T')}
              className={`w-full p-5 rounded-xl font-be-vietnam text-left transition-all duration-200 border-2 ${
                selected === 'T'
                  ? 'bg-navy border-navy text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-navy hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selected === 'T' ? 'border-white bg-gold text-navy' : 'border-navy'
                }`}>
                  T
                </span>
                <div>
                  <div className="font-semibold">Lý trí (Thinking)</div>
                  <div className="text-sm opacity-80">
                    Quyết định dựa trên logic, phân tích khách quan
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={() => onChange('F')}
              className={`w-full p-5 rounded-xl font-be-vietnam text-left transition-all duration-200 border-2 ${
                selected === 'F'
                  ? 'bg-navy border-navy text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-navy hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selected === 'F' ? 'border-white bg-gold text-navy' : 'border-navy'
                }`}>
                  F
                </span>
                <div>
                  <div className="font-semibold">Cảm xúc (Feeling)</div>
                  <div className="text-sm opacity-80">
                    Quyết định dựa trên giá trị, đồng cảm với người khác
                  </div>
                </div>
              </div>
            </button>
          </>
        )}
        {type === 'JP' && (
          <>
            <button
              onClick={() => onChange('J')}
              className={`w-full p-5 rounded-xl font-be-vietnam text-left transition-all duration-200 border-2 ${
                selected === 'J'
                  ? 'bg-navy border-navy text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-navy hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selected === 'J' ? 'border-white bg-gold text-navy' : 'border-navy'
                }`}>
                  J
                </span>
                <div>
                  <div className="font-semibold">Nguyên tắc (Judging)</div>
                  <div className="text-sm opacity-80">
                    Thích lập kế hoạch, có tổ chức, quyết đoán
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={() => onChange('P')}
              className={`w-full p-5 rounded-xl font-be-vietnam text-left transition-all duration-200 border-2 ${
                selected === 'P'
                  ? 'bg-navy border-navy text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white border-gray-200 hover:border-navy hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selected === 'P' ? 'border-white bg-gold text-navy' : 'border-navy'
                }`}>
                  P
                </span>
                <div>
                  <div className="font-semibold">Linh hoạt (Perceiving)</div>
                  <div className="text-sm opacity-80">
                    Thích thích ứng, linh hoạt, giữ các lựa chọn mở
                  </div>
                </div>
              </div>
            </button>
          </>
        )}
      </div>
    );
  }

  return null;
}

export default AnswerOptions;