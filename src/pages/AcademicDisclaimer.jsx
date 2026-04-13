import React from 'react';
import { Link } from 'react-router-dom';

const citations = [
  {
    name: 'Holland RIASEC',
    count: '42 câu — 7 câu/nhóm',
    color: 'border-navy bg-blue-50',
    badge: 'bg-navy text-white',
    text: 'Lương Hải Anh. (2026). Bộ câu hỏi Holland RIASEC — Phiên bản tiếng Việt dành cho học sinh THPT [Công cụ trắc nghiệm]. Đoàn trường THPT Chuyên Nguyễn Trãi, Hải Phòng. Xây dựng dựa trên lý thuyết Holland (1985).'
  },
  {
    name: 'MBTI',
    count: '60 câu — 15 câu/chiều',
    color: 'border-purple-500 bg-purple-50',
    badge: 'bg-purple-500 text-white',
    text: 'Lương Hải Anh. (2026). Bộ câu hỏi MBTI — Phiên bản tiếng Việt dành cho học sinh THPT [Công cụ trắc nghiệm]. Đoàn trường THPT Chuyên Nguyễn Trãi, Hải Phòng. Xây dựng dựa trên lý thuyết Myers & McCaulley (1985).'
  },
  {
    name: 'DISC',
    count: '28 câu — 7 câu/nhóm',
    color: 'border-teal-500 bg-teal-50',
    badge: 'bg-teal-500 text-white',
    text: 'Lương Hải Anh. (2026). Bộ câu hỏi DISC — Phiên bản tiếng Việt dành cho học sinh THPT [Công cụ trắc nghiệm]. Đoàn trường THPT Chuyên Nguyễn Trãi, Hải Phòng. Xây dựng dựa trên lý thuyết Marston (1928).'
  }
];

const references = [
  'Holland, J. L. (1985). Making vocational choices: A theory of vocational personalities and work environments (2nd ed.). Prentice-Hall.',
  'Myers, I. B., & McCaulley, M. H. (1985). Manual: A guide to the development and use of the Myers-Briggs Type Indicator. Consulting Psychologists Press.',
  'Marston, W. M. (1928). Emotions of normal people. Kegan Paul, Trench, Trubner & Company.'
];

function AcademicDisclaimer() {
  return (
    <div className="min-h-screen py-10 sm:py-14 bg-gray-50">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10">

          {/* Back button */}
          <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light font-be-vietnam text-sm mb-8 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại Trang chủ
          </Link>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-navy/10 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="font-be-vietnam font-bold text-2xl sm:text-3xl text-navy">
              Tuyên bố học thuật
            </h1>
            <p className="font-be-vietnam text-gray-400 text-sm mt-1">
              Academic Disclaimer & References
            </p>
            <p className="font-be-vietnam text-gray-400 text-xs mt-2">
              Cập nhật: Tháng 4/2026
            </p>
          </div>

          {/* Section: Author */}
          <section className="mb-8">
            <h2 className="font-be-vietnam font-bold text-lg text-navy mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Tác giả bộ câu hỏi
            </h2>
            <div className="border-l-4 border-gold bg-gold/5 rounded-r-xl p-5">
              <dl className="space-y-2 font-be-vietnam text-sm text-gray-700">
                <div className="flex gap-2">
                  <dt className="font-semibold text-navy min-w-[120px]">Họ và tên:</dt>
                  <dd>Lương Hải Anh</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-navy min-w-[120px]">Chức vụ:</dt>
                  <dd>Uỷ viên BCH Đoàn trường</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-navy min-w-[120px]">Đơn vị:</dt>
                  <dd>THPT Chuyên Nguyễn Trãi, Thành phố Hải Phòng</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-navy min-w-[120px]">Năm biên soạn:</dt>
                  <dd>2026</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Section: Methodology */}
          <section className="mb-8">
            <h2 className="font-be-vietnam font-bold text-lg text-navy mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Phương pháp biên soạn
            </h2>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <p className="font-be-vietnam text-sm text-gray-700 leading-relaxed">
                Bộ câu hỏi được biên soạn có tham chiếu đến <strong>3 khung lý thuyết tâm lý học nghề nghiệp</strong> được 
                công nhận quốc tế, sau đó được kiểm định lại theo tiêu chí phân loại nhóm chuẩn — loại bỏ câu hỏi 
                phân loại sai nhóm và câu hỏi trùng lặp construct.
              </p>
            </div>
          </section>

          {/* Section: Citations */}
          <section className="mb-8">
            <h2 className="font-be-vietnam font-bold text-lg text-navy mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Trích dẫn các bộ trắc nghiệm
            </h2>
            <div className="space-y-4">
              {citations.map((c, i) => (
                <div key={i} className={`border-l-4 ${c.color} rounded-r-xl p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`${c.badge} text-xs font-bold px-2.5 py-1 rounded-full font-be-vietnam`}>
                      {c.name}
                    </span>
                    <span className="text-xs text-gray-500 font-be-vietnam">{c.count}</span>
                  </div>
                  <blockquote className="font-be-vietnam text-sm text-gray-700 leading-relaxed italic pl-3 border-l-2 border-gray-200">
                    {c.text}
                  </blockquote>
                </div>
              ))}
            </div>
          </section>

          {/* Section: References */}
          <section className="mb-8">
            <h2 className="font-be-vietnam font-bold text-lg text-navy mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              References
            </h2>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <ol className="space-y-3">
                {references.map((ref, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-be-vietnam font-bold text-navy text-sm min-w-[24px]">[{i + 1}]</span>
                    <span className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                      {ref}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Footer: Non-commercial notice */}
          <div className="bg-navy/5 border border-navy/10 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="font-be-vietnam text-sm text-gray-600 leading-relaxed">
                Bộ câu hỏi này được biên soạn <strong>phi thương mại</strong>, phục vụ mục đích giáo dục và định hướng 
                nghề nghiệp cho học sinh. Không sao chép hoặc sử dụng cho mục đích thương mại khi chưa có sự 
                đồng ý của tác giả.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AcademicDisclaimer;
