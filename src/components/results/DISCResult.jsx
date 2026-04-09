import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function DISCResult({ result }) {
  const { scores, percentages, dominant, style, workplaceEnvironment, leadershipStyle, topCareers } = result;

  const chartData = [
    { name: 'D - Thống trị', value: percentages.D, color: '#ef4444' },
    { name: 'I - Ảnh hưởng', value: percentages.I, color: '#f59e0b' },
    { name: 'S - Ổn định', value: percentages.S, color: '#22c55e' },
    { name: 'C - Cẩn thận', value: percentages.C, color: '#3b82f6' }
  ];

  const getStyleName = () => {
    const names = {
      D: 'Người Thống trị (Dominant)',
      I: 'Người Ảnh hưởng (Influential)',
      S: 'Người Ổn định (Steady)',
      C: 'Người Cẩn thận (Conscientious)',
      DI: 'Người Thống trị-Ảnh hưởng',
      DS: 'Người Thống trị-Ổn định',
      DC: 'Người Thống trị-Cẩn thận',
      ID: 'Người Ảnh hưởng-Thống trị',
      IS: 'Người Ảnh hưởng-Ổn định',
      IC: 'Người Ảnh hưởng-Cẩn thận',
      SD: 'Người Ổn định-Thống trị',
      SI: 'Người Ổn định-Ảnh hưởng',
      SC: 'Người Ổn định-Cẩn thận',
      CD: 'Người Cẩn thận-Thống trị',
      CI: 'Người Cẩn thận-Ảnh hưởng',
      CS: 'Người Cẩn thận-Ổn định'
    };
    return names[style] || names[dominant];
  };

  const getStyleDescription = () => {
    const descriptions = {
      D: 'Bạn là người quyết đoán, hướng tới kết quả và không ngại thử thách. Bạn thích được trao quyền và có khả năng ra quyết định nhanh trong các tình huống khó khăn.',
      I: 'Bạn là người nhiệt tình, giao tiếp tốt và thích làm việc với mọi người. Bạn có khả năng thuyết phục và truyền cảm hứng cho người khác.',
      S: 'Bạn là người kiên nhẫn, đáng tin cậy và quan tâm đến người khác. Bạn thích sự ổn định và hòa thuận trong môi trường làm việc.',
      C: 'Bạn là người chính xác, cẩn thận và tuân thủ quy trình. Bạn thích làm việc với dữ liệu và có tiêu chuẩn chất lượng cao.'
    };

    if (style.length === 2) {
      return `${descriptions[style[0]]} Kết hợp với đặc điểm của người ${style[1]}.`;
    }
    return descriptions[style];
  };

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
          Kết quả DISC
        </h2>
        <div className="inline-flex items-center justify-center px-6 py-4 bg-gradient-to-br from-navy to-navy-light text-white rounded-xl shadow-lg">
          <span className="font-be-vietnam font-black text-2xl tracking-wider">{style}</span>
        </div>
        <p className="font-be-vietnam font-semibold text-xl text-gold mt-4">
          {getStyleName()}
        </p>
      </div>

      {/* Description */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-3">
          Phong cách làm việc
        </h3>
        <p className="font-be-vietnam text-gray-700 leading-relaxed">
          {getStyleDescription()}
        </p>
      </div>

      {/* Bar Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-4 text-center">
          Biểu đồ điểm DISC
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fontFamily: 'Be Vietnam Pro' }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontFamily: 'Be Vietnam Pro' }} width={120} />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Điểm']}
                contentStyle={{ fontFamily: 'Be Vietnam Pro', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Workplace & Leadership */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-be-vietnam font-semibold text-navy mb-2">Môi trường làm việc lý tưởng</h3>
          <p className="font-be-vietnam text-sm text-gray-600">{workplaceEnvironment}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-be-vietnam font-semibold text-navy mb-2">Phong cách lãnh đạo</h3>
          <p className="font-be-vietnam text-sm text-gray-600">{leadershipStyle}</p>
        </div>
      </div>

      {/* Recommended Careers */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-4">
          Nghề nghiệp phù hợp với phong cách của bạn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topCareers.slice(0, 8).map((career) => (
            <div key={career.id} className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
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
              <strong>Miễn trừ trách nhiệm:</strong> Kết quả trắc nghiệm DISC này chỉ mang tính chất tham khảo, 
              được phân tích dựa trên câu trả lời của bạn bằng thuật toán. Phong cách làm việc có thể thay đổi 
              theo hoàn cảnh và kinh nghiệm. Vui lòng tham khảo thêm ý kiến chuyên gia trước khi đưa ra quyết định nghề nghiệp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DISCResult;