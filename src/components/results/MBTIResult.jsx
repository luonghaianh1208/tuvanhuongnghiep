import React from 'react';

function MBTIResult({ result }) {
  const { type, percentages, profile, topCareers } = result;

  const dimensions = [
    { key: 'EI', first: 'E', second: 'I', firstLabel: 'Hướng ngoại', secondLabel: 'Hướng nội' },
    { key: 'SN', first: 'S', second: 'N', firstLabel: 'Giác quan', secondLabel: 'Trực giác' },
    { key: 'TF', first: 'T', second: 'F', firstLabel: 'Lý trí', secondLabel: 'Cảm xúc' },
    { key: 'JP', first: 'J', second: 'P', firstLabel: 'Nguyên tắc', secondLabel: 'Linh hoạt' }
  ];

  const getAIOpportunityBadge = (outlook) => {
    const badges = {
      'Phát triển mạnh': 'bg-green-100 text-green-700',
      'Ổn định': 'bg-yellow-100 text-yellow-700',
      'Rủi ro cao': 'bg-red-100 text-red-700'
    };
    return badges[outlook] || badges['Ổn định'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-be-vietnam font-bold text-2xl text-navy mb-2">
          Kết quả MBTI
        </h2>
        <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-navy to-navy-light text-white rounded-xl shadow-lg">
          <span className="font-be-vietnam font-black text-4xl tracking-widest">{type}</span>
        </div>
        <p className="font-be-vietnam font-semibold text-xl text-gold mt-4">
          {profile.name}
        </p>
      </div>

      {/* Description */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-3">
          Mô tả tính cách
        </h3>
        <p className="font-be-vietnam text-gray-700 leading-relaxed">
          {profile.description}
        </p>
      </div>

      {/* Dimensions */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-4">
          4 chiều tính cách
        </h3>
        <div className="space-y-4">
          {dimensions.map((dim) => (
            <div key={dim.key}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-be-vietnam text-sm font-medium text-gray-600">
                  {dim.firstLabel} ←→ {dim.secondLabel}
                </span>
                <span className="font-be-vietnam text-sm font-semibold text-navy">
                  {percentages[dim.first]}% / {percentages[dim.second]}%
                </span>
              </div>
              <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
                <div
                  className="bg-navy transition-all duration-500"
                  style={{ width: `${percentages[dim.first]}%` }}
                />
                <div
                  className="bg-gold transition-all duration-500"
                  style={{ width: `${percentages[dim.second]}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-be-vietnam text-xs text-gray-500">{dim.first}</span>
                <span className="font-be-vietnam text-xs text-gray-500">{dim.second}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-navy/5 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-3">
          Điểm mạnh nổi bật
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile.strengths.map((strength, index) => (
            <span
              key={index}
              className="font-be-vietnam px-3 py-1.5 bg-white border border-navy/20 rounded-full text-sm text-navy"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>

      {/* Workplace & Leadership */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-be-vietnam font-semibold text-navy mb-2">Môi trường lý tưởng</h3>
          <p className="font-be-vietnam text-sm text-gray-600">{profile.workplaceEnvironment}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-be-vietnam font-semibold text-navy mb-2">Phong cách lãnh đạo</h3>
          <p className="font-be-vietnam text-sm text-gray-600">{profile.leadershipStyle}</p>
        </div>
      </div>

      {/* Suitable Careers */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-4">
          Nghề nghiệp phù hợp ({profile.suitableCareers.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {profile.suitableCareers.slice(0, 8).map((career) => (
            <div key={career.id || career.name} className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-1">
                <span className="font-be-vietnam font-medium text-navy text-sm">{career.name}</span>
                <span className={`font-be-vietnam text-xs px-2 py-0.5 rounded-full ${getAIOpportunityBadge(career.aiOutlook)}`}>
                  {career.aiOutlook}
                </span>
              </div>
              <p className="font-be-vietnam text-xs text-gray-500">Lương: {career.avgSalary}</p>
            </div>
          ))}
        </div>

        <h3 className="font-be-vietnam font-semibold text-lg text-navy mt-6 mb-4">
          Nghề nên cân nhắc ({profile.considerCareers.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {profile.considerCareers.slice(0, 4).map((career) => (
            <div key={career.id || career.name} className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-1">
                <span className="font-be-vietnam font-medium text-navy text-sm">{career.name}</span>
                <span className={`font-be-vietnam text-xs px-2 py-0.5 rounded-full ${getAIOpportunityBadge(career.aiOutlook)}`}>
                  {career.aiOutlook}
                </span>
              </div>
              <p className="font-be-vietnam text-xs text-gray-500">Lương: {career.avgSalary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-be-vietnam text-xs sm:text-sm text-amber-800 leading-relaxed">
              <strong>Miễn trừ trách nhiệm:</strong> Kết quả trắc nghiệm MBTI này chỉ mang tính chất tham khảo, 
              được phân tích dựa trên câu trả lời của bạn bằng thuật toán. MBTI không phải công cụ đo lường tâm lý chính thức 
              và có thể thay đổi theo thời gian. Vui lòng tham khảo thêm ý kiến chuyên gia trước khi đưa ra quyết định nghề nghiệp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MBTIResult;