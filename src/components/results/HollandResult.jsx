import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

function HollandResult({ result }) {
  const { scores, percentages, code, topGroups, topCareers } = result;

  const chartData = [
    { subject: 'R - Thực tế', value: percentages.R, fullMark: 100 },
    { subject: 'I - Nghiên cứu', value: percentages.I, fullMark: 100 },
    { subject: 'A - Nghệ thuật', value: percentages.A, fullMark: 100 },
    { subject: 'S - Xã hội', value: percentages.S, fullMark: 100 },
    { subject: 'E - Doanh nhân', value: percentages.E, fullMark: 100 },
    { subject: 'C - Quy củ', value: percentages.C, fullMark: 100 }
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
          Kết quả Holland RIASEC
        </h2>
        <div className="inline-flex items-center justify-center px-6 py-3 bg-navy text-white rounded-xl">
          <span className="font-be-vietnam font-bold text-3xl tracking-wider">{code}</span>
        </div>
        <p className="font-be-vietnam text-gray-600 mt-3">
          Mã Holland của bạn: {topGroups.map(g => g.code).join(' > ')}
        </p>
      </div>

      {/* Radar Chart */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-4 text-center">
          Biểu đồ tính cách 6 nhóm
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 11, fontFamily: 'Be Vietnam Pro' }}
                stroke="#1e3a5f"
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Điểm"
                dataKey="value"
                stroke="#1e3a5f"
                fill="#1e3a5f"
                fillOpacity={0.5}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 3 Groups */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-4">
          Top 3 nhóm tính cách nổi bật
        </h3>
        <div className="space-y-3">
          {topGroups.map((group, index) => (
            <div key={group.code} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-be-vietnam font-bold text-sm mr-3">
                  {index + 1}
                </span>
                <span className="font-be-vietnam font-medium text-gray-800">
                  {group.name}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                  <div
                    className="h-full bg-gradient-to-r from-navy to-gold rounded-full"
                    style={{ width: `${group.percentage}%` }}
                  />
                </div>
                <span className="font-be-vietnam font-semibold text-navy w-12 text-right">
                  {group.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Careers */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-be-vietnam font-semibold text-lg text-navy mb-4">
          Nghề nghiệp phù hợp với bạn
        </h3>
        <div className="space-y-4">
          {topCareers.slice(0, 10).map((career, index) => (
            <div key={career.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="font-be-vietnam font-semibold text-navy mr-2">
                      {index + 1}. {career.name}
                    </span>
                    <span className={`font-be-vietnam text-xs px-2 py-1 rounded-full ${getAIOpportunityBadge(career.aiOutlook)}`}>
                      {career.aiOutlook}
                    </span>
                  </div>
                  <p className="font-be-vietnam text-sm text-gray-600 mb-2">
                    {career.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="font-be-vietnam px-2 py-1 bg-navy/10 text-navy rounded">
                      Mã Holland: {career.hollandCode}
                    </span>
                    <span className="font-be-vietnam px-2 py-1 bg-gold/20 text-gold-dark rounded">
                      Lương: {career.avgSalary}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HollandResult;