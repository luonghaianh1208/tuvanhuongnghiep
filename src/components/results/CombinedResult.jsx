import React from 'react';

function CombinedResult({ results }) {
  const { top5Careers, analysis } = results;

  const getAIOpportunityBadge = (outlook) => {
    const badges = {
      'Phát triển mạnh': 'bg-green-100 text-green-700',
      'Ổn định': 'bg-yellow-100 text-yellow-700',
      'Rủi ro cao': 'bg-red-100 text-red-700'
    };
    return badges[outlook] || badges['Ổn định'];
  };

  const getCompatibilityColor = (compat) => {
    if (compat >= 85) return 'text-green-600';
    if (compat >= 70) return 'text-gold';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-be-vietnam font-bold text-2xl text-navy mb-2">
          Tổng hợp từ tất cả các bài test
        </h2>
        <p className="font-be-vietnam text-gray-600">
          Top 5 nghề xuất hiện nhiều nhất trong các bài test bạn đã làm
        </p>
      </div>

      {/* Analysis Summary */}
      <div className="bg-gradient-to-r from-navy/10 to-gold/10 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-3">
          Tổng quan phân tích
        </h3>
        <p className="font-be-vietnam text-gray-700 leading-relaxed">
          {analysis}
        </p>
      </div>

      {/* Top 5 Combined Careers */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-4">
          Top 5 nghề phù hợp nhất
        </h3>
        <div className="space-y-4">
          {top5Careers.map((career, index) => (
            <div
              key={career.id}
              className="relative border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
            >
              {/* Rank Badge */}
              <div className="absolute -top-3 left-4">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-be-vietnam font-bold text-sm text-white ${
                  index === 0 ? 'bg-gold' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-navy'
                }`}>
                  {index + 1}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Career Info */}
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <h4 className="font-be-vietnam font-semibold text-lg text-navy">
                      {career.name}
                    </h4>
                    <span className={`font-be-vietnam text-xs px-2 py-1 rounded-full ${getAIOpportunityBadge(career.aiOutlook)}`}>
                      {career.aiOutlook}
                    </span>
                  </div>
                  <p className="font-be-vietnam text-sm text-gray-600 mb-3">
                    {career.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="font-be-vietnam px-2 py-1 bg-navy/10 text-navy rounded">
                      Holland: {career.hollandCode}
                    </span>
                    <span className="font-be-vietnam px-2 py-1 bg-gold/20 text-gold-dark rounded">
                      Lương: {career.avgSalary}
                    </span>
                  </div>
                </div>

                {/* Compatibility */}
                <div className="flex flex-col items-center md:items-end">
                  <div className={`font-be-vietnam text-3xl font-bold ${getCompatibilityColor(career.compatibility)}`}>
                    {career.compatibility}%
                  </div>
                  <div className="font-be-vietnam text-xs text-gray-500">Độ tương thích</div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className={`h-full rounded-full ${
                        career.compatibility >= 85 ? 'bg-green-500' :
                        career.compatibility >= 70 ? 'bg-gold' : 'bg-gray-400'
                      }`}
                      style={{ width: `${career.compatibility}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* AI Reason */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-be-vietnam text-sm text-gray-600">
                    <span className="font-medium text-navy">Triển vọng AI: </span>
                    {career.aiReason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-navy text-white rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg mb-3">
          Lời khuyên từ chuyên gia
        </h3>
        <ul className="space-y-2 font-be-vietnam text-gray-200 text-sm">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Hãy chọn những nghề có triển vọng AI "Phát triển mạnh" để có cơ hội thăng tiến tốt hơn</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Với những nghề có "Rủi ro cao", hãy tập trung vào các kỹ năng AI không thể thay thế</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Kết hợp kết quả từ nhiều bài test để có cái nhìn toàn diện hơn về con đường sự nghiệp</span>
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-be-vietnam text-xs sm:text-sm text-amber-800 leading-relaxed">
              <strong>Miễn trừ trách nhiệm:</strong> Kết quả tổng hợp này được tính toán bằng thuật toán dựa trên câu trả lời của bạn 
              từ các bài trắc nghiệm. Độ tương thích và xếp hạng nghề nghiệp chỉ mang tính chất tham khảo, không thay thế cho 
              tư vấn hướng nghiệp chuyên nghiệp. Quyết định nghề nghiệp nên dựa trên nhiều yếu tố khác nhau.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinedResult;