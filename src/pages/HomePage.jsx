import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SCHOOL_LOGO = 'https://doantruong.chuyennguyentrai.edu.vn/wp-content/uploads/2026/02/Logo-CNT.png';
const DOAN_LOGO = 'https://doantruong.chuyennguyentrai.edu.vn/wp-content/uploads/2025/12/Huy_Hieu_Doan.png';

const MOCK_REVIEWS = [
  // 4 Học sinh (HS)
  {
    name: 'Nguyễn Minh Anh',
    role: 'Học sinh lớp 12 Tin',
    rating: 5,
    content: 'Bộ test Holland thực sự giúp mình hiểu rõ bản thân hơn. Kết quả AI phân tích rất sát với đam mê công nghệ của mình!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MinhAnh'
  },
  {
    name: 'Trần Hoàng Nam',
    role: 'Học sinh lớp 11 Lý',
    rating: 5,
    content: 'Giao diện cực mượt, không cần đăng nhập nên mình làm rất nhanh. Bài DISC giúp mình cải thiện kỹ năng giao tiếp với bạn bè.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HoangNam'
  },
  {
    name: 'Lê Thu Hà',
    role: 'Học sinh lớp 12 Văn',
    rating: 4,
    content: 'Nhờ AI tư vấn mà mình biết thêm nhiều khối ngành phù hợp với nhóm tính cách Nghệ thuật. Rất hữu ích cho mùa tuyển sinh này!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThuHa'
  },
  {
    name: 'Đinh Tiến Dũng',
    role: 'Học sinh lớp 11 Hóa',
    rating: 5,
    content: 'Từng mông lung không biết theo Kỹ thuật Hóa học hay Dược, làm xong bộ 3 bài test ở đây thì mình đã có quyết định chắc chắn. Cảm ơn team!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TienDung'
  },
  
  // 3 Phụ huynh (PH)
  {
    name: 'Ngô Thùy Linh',
    role: 'Phụ huynh lớp 11',
    rating: 5,
    content: 'Tôi làm thử để định hướng cho con gái đang học lớp 11. Các bài kiểm tra khoa học và dễ hiểu. Rất cảm ơn nhóm tác giả đã xây dựng trang web này.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThuyLinh'
  },
  {
    name: 'Bùi Trung Kiên',
    role: 'Phụ huynh lớp 12',
    rating: 4,
    content: 'Lúc đầu cháu chọn ngành IT theo phong trào, nhưng sau khi xem điểm yếu qua bài test DISC, gia đình đã ngồi lại để định hướng nghề phù hợp với sức học của con hơn.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TrungKien'
  },
  {
    name: 'Trần Thị Loan',
    role: 'Phụ huynh lớp 10',
    rating: 5,
    content: 'Nhờ có AI hỗ trợ mà giao diện dễ thao tác với cả phụ huynh. Tôi đã thấu hiểu tâm lý và sở trường của con trai mình thay vì chỉ ép cháu học khối A như trước.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThiLoan'
  },

  // 3 Giáo viên (GV)
  {
    name: 'Cô Nguyễn Hương',
    role: 'Giáo viên Chủ nhiệm',
    rating: 5,
    content: 'Tôi thường dùng web này cho tiết sinh hoạt lớp. Học sinh rất thích vì test miễn phí, kết quả lại trả về nhanh gọn mà các em không lười vì phải tạo tài khoản.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenHuong'
  },
  {
    name: 'Thầy Đỗ Tuấn',
    role: 'Giáo viên dạy Toán',
    rating: 5,
    content: 'Một website giáo dục rất thực tế, thiết kế ấn tượng theo kiểu Gen Z. Công cụ đo lường Holland giúp tôi cố vấn chọn khối ngành ĐH chính xác hơn cho học trò.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DoTuan'
  },
  {
    name: 'Cô Phạm Lan',
    role: 'Chuyên viên Tâm lý học đường',
    rating: 5,
    content: 'Về phương diện tâm lý học, kết quả test MBTI tại đây cực kỳ sát và chi tiết. Phần AI (Gen AI) tích hợp rất thông minh giúp tự động tháo gỡ nhiều băn khoăn của các em.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhamLan'
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0f172a] text-white py-16 sm:py-20 md:py-32">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-600/30 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/30 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Logos */}
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={SCHOOL_LOGO}
                  alt="Logo Trường THPT Chuyên Nguyễn Trãi"
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover bg-white p-1 shadow-2xl"
                />
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={DOAN_LOGO}
                  alt="Huy hiệu Đoàn TNCS Hồ Chí Minh"
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover bg-white p-1 shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="font-be-vietnam text-amber-400 text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4"
            >
              Đoàn trường THPT Chuyên Nguyễn Trãi - Hải Phòng
            </motion.p>

            <motion.h1 
              variants={fadeInUp}
              className="font-be-vietnam font-black text-3xl sm:text-5xl md:text-7xl mb-6 leading-tight tracking-tight"
            >
              Khám phá nghề nghiệp<br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">phù hợp với bạn</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="font-be-vietnam text-sm sm:text-base md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed px-4"
            >
              Trang web trắc nghiệm hướng nghiệp miễn phí với 3 bộ test phổ biến nhất:
              <span className="text-white font-semibold"> Holland RIASEC, MBTI và DISC</span>. 
              Kết hợp phân tích AI để đưa ra lời khuyên cá nhân hóa cho tương lai của bạn.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                to="/select-test"
                className="group relative inline-flex items-center"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
                <div className="relative px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-be-vietnam font-black text-base sm:text-lg rounded-2xl shadow-xl transform transition-all active:scale-95 flex items-center">
                  <svg className="w-6 h-6 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Bắt đầu trắc nghiệm ngay
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Quick View (Gen Z touch) */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Lượt tham gia', val: '90K+', color: 'text-blue-500' },
            { label: 'Độ chính xác', val: '98%', color: 'text-amber-500' },
            { label: 'Bộ trắc nghiệm', val: '03', color: 'text-purple-500' },
            { label: 'Phí dịch vụ', val: '0đ', color: 'text-green-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
              <div className={`text-2xl sm:text-3xl font-black mb-1 ${stat.color}`}>{stat.val}</div>
              <div className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-be-vietnam font-black text-3xl sm:text-4xl text-[#0f172a] mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '3 Bộ Test Chuẩn Quốc Tế',
                desc: 'Holland RIASEC, MBTI 16 personalities và DISC - được sử dụng rộng rãi trên toàn thế giới',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                bg: 'bg-indigo-50',
                text: 'text-indigo-600'
              },
              {
                title: 'Phân Tích AI Miễn Phí',
                desc: 'Nhận lời khuyên cá nhân hóa từ AI, lộ trình học tập và dự báo xu hướng nghề nghiệp cực nhanh',
                icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
                bg: 'bg-amber-50',
                text: 'text-amber-600'
              },
              {
                title: 'Tiết Kiệm Thời Gian',
                desc: 'Làm test nhanh chóng, xem kết quả ngay. Không cần đăng ký rườm rà hay đăng nhập',
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                bg: 'bg-emerald-50',
                text: 'text-emerald-600'
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all shadow-sm hover:shadow-xl"
              >
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <svg className={`w-8 h-8 ${feature.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-be-vietnam font-bold text-xl text-[#0f172a] mb-3">{feature.title}</h3>
                <p className="font-be-vietnam text-slate-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tests Introduction */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-be-vietnam font-black text-3xl sm:text-4xl text-[#0f172a] text-center mb-16"
          >
            3 Bộ Trắc Nghiệm Hướng Nghiệp
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Holland */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-200"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 text-white relative">
                <div className="absolute top-4 right-4 text-white/20 font-black text-6xl italic leading-none select-none">R</div>
                <h3 className="font-be-vietnam font-black text-2xl mb-1 mt-2">Holland RIASEC</h3>
                <p className="font-be-vietnam text-indigo-100 text-sm font-medium">42 câu hỏi tinh gọn</p>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {['R', 'I', 'A', 'S', 'E', 'C'].map((code) => (
                    <span key={code} className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-be-vietnam font-black text-sm border border-indigo-100">
                      {code}
                    </span>
                  ))}
                </div>
                <p className="font-be-vietnam text-slate-600 text-sm mb-6 leading-relaxed">
                  Xác định 6 nhóm tính cách: Thực tế, Nghiên cứu, Nghệ thuật, Xã hội, Doanh nhân, Quy củ.
                  Kết quả là mã 3 chữ cái giúp bạn khám phá định hướng nghề nghiệp.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300">
                  <span className="font-bold text-slate-700 text-xs">Phù hợp:</span> 
                  <span className="text-slate-500 text-xs ml-1">Học sinh THPT, người chưa rõ định hướng</span>
                </div>
              </div>
            </motion.div>

            {/* MBTI */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-200"
            >
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 text-white relative">
                <div className="absolute top-4 right-4 text-white/20 font-black text-6xl italic leading-none select-none">16</div>
                <h3 className="font-be-vietnam font-black text-2xl mb-1 mt-2">MBTI</h3>
                <p className="font-be-vietnam text-purple-100 text-sm font-medium">16 Personality Types</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'].map((dim) => (
                    <span key={dim} className="w-9 h-9 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-be-vietnam font-black text-sm border border-purple-100">
                      {dim}
                    </span>
                  ))}
                </div>
                <p className="font-be-vietnam text-slate-600 text-sm mb-6 leading-relaxed">
                  Đo 4 chiều tính cách: Hướng ngoại/nội, Giác quan/Trực giác, Lý trí/Cảm xúc,
                  Nguyên tắc/Linh hoạt. Kết quả là 1 trong 16 nhóm tính cách riêng biệt.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300">
                  <span className="font-bold text-slate-700 text-xs">Phù hợp:</span> 
                  <span className="text-slate-500 text-xs ml-1">Ai muốn hiểu sâu sắc tính cách bản thân</span>
                </div>
              </div>
            </motion.div>

            {/* DISC */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-200"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white relative">
                <div className="absolute top-4 right-4 text-white/20 font-black text-6xl italic leading-none select-none">D</div>
                <h3 className="font-be-vietnam font-black text-2xl mb-1 mt-2">DISC</h3>
                <p className="font-be-vietnam text-emerald-100 text-sm font-medium">Phong cách làm việc</p>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { code: 'D', color: 'bg-rose-50 text-rose-600 border-rose-100' },
                    { code: 'I', color: 'bg-amber-50 text-amber-600 border-amber-100' },
                    { code: 'S', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                    { code: 'C', color: 'bg-sky-50 text-sky-600 border-sky-100' }
                  ].map(({ code, color }) => (
                    <span key={code} className={`w-9 h-9 rounded-xl flex items-center justify-center font-be-vietnam font-black text-sm border ${color}`}>
                      {code}
                    </span>
                  ))}
                </div>
                <p className="font-be-vietnam text-slate-600 text-sm mb-6 leading-relaxed">
                  Xác định 4 phong cách: Thống trị, Ảnh hưởng, Ổn định, Cẩn thận.
                  Giúp bạn hiểu cách làm việc đội nhóm và giao tiếp trong môi trường chuyên nghiệp.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300">
                  <span className="font-bold text-slate-700 text-xs">Phù hợp:</span> 
                  <span className="text-slate-500 text-xs ml-1">Người muốn cải thiện kỹ năng mềm, kĩ năng lãnh đạo</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Review Section (Social Proof - Gen Z love this) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-be-vietnam font-black text-3xl sm:text-4xl text-slate-900 mb-4">
              Cảm nhận từ người dùng
            </h2>
            <p className="text-slate-500 font-be-vietnam">Sản phẩm được tin chọn bởi Học sinh, Phụ huynh và Thầy Cô trên toàn quốc</p>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex py-4">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <motion.div 
            className="flex gap-8 w-max px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 50, repeat: Infinity }}
          >
            {[...MOCK_REVIEWS, ...MOCK_REVIEWS].map((review, i) => (
              <div 
                key={i}
                className="bg-slate-50 rounded-[2.5rem] p-8 relative hover:bg-white hover:shadow-2xl transition-all border border-slate-100 w-[350px] shrink-0"
              >
                <div className="text-amber-400 flex mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-be-vietnam text-slate-700 italic mb-8 leading-relaxed">"{review.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-2xl bg-white p-1" />
                  <div>
                    <h4 className="font-be-vietnam font-black text-slate-900 leading-none mb-1">{review.name}</h4>
                    <span className="text-slate-500 text-xs font-medium uppercase tracking-tighter">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sample Results Preview */}
      <section className="py-20 bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-be-vietnam font-black text-3xl sm:text-4xl text-center mb-16"
          >
            Trực quan kết quả trắc nghiệm
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10"
            >
              <h3 className="font-be-vietnam font-black text-amber-500 mb-6 text-xl">Biểu đồ Holland RIASEC</h3>
              <div className="bg-slate-900/50 rounded-2xl p-6">
                <div className="space-y-4">
                  {[
                    { name: 'R - Thực tế', value: 75, color: 'bg-blue-500' },
                    { name: 'I - Nghiên cứu', value: 60, color: 'bg-indigo-500' },
                    { name: 'A - Nghệ thuật', value: 85, color: 'bg-purple-500' },
                    { name: 'S - Xã hội', value: 45, color: 'bg-rose-500' },
                    { name: 'E - Doanh nhân', value: 55, color: 'bg-orange-500' },
                    { name: 'C - Quy củ', value: 30, color: 'bg-emerald-500' }
                  ].map((item) => (
                    <div key={item.name} className="flex items-center group">
                      <span className="w-32 font-be-vietnam text-xs text-slate-400 group-hover:text-white transition-colors">{item.name}</span>
                      <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                      <span className="ml-4 font-be-vietnam text-sm font-black w-10 text-right">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="font-be-vietnam text-sm text-slate-400">
                  Mã Holland của bạn: <span className="text-amber-500 font-black">AIR</span>
                </p>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-900"></div>
                  <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-900"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-slate-900"></div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10"
            >
              <h3 className="font-be-vietnam font-black text-amber-500 mb-6 text-xl">Dự báo Gen AI</h3>
              <div className="space-y-4">
                {[
                  { name: 'Nhà thiết kế đồ họa', compat: 92, trend: 'Tăng trưởng mạnh' },
                  { name: 'Kiến trúc sư', compat: 88, trend: 'Ổn định' },
                  { name: 'Game Designer', compat: 85, trend: 'Tăng trưởng mạnh' },
                  { name: 'Content Creator', compat: 78, trend: 'Tăng trưởng mạnh' }
                ].map((career) => (
                  <div key={career.name} className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 transition-colors group">
                    <div className="min-w-0">
                      <span className="font-be-vietnam font-bold text-white text-base block mb-1">{career.name}</span>
                      <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-lg inline-block ${
                        career.trend === 'Tăng trưởng mạnh' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {career.trend}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="font-be-vietnam font-black text-amber-500 text-xl">{career.compat}%</span>
                       <span className="text-[10px] text-slate-500 font-bold uppercase">Độ hợp</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-500 overflow-hidden relative">
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-64 h-64 border-[32px] border-amber-400/30 rounded-full"
         />
         <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-10 left-10 w-20 h-20 bg-amber-400/50 rounded-full"
         />
         
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-be-vietnam font-black text-3xl sm:text-5xl text-slate-900 mb-4">
              Sẵn sàng tỏa sáng?
            </h2>
            <p className="font-be-vietnam text-slate-900/70 mb-10 text-lg font-medium">
              Thực hiện trắc nghiệm hoàn toàn miễn phí ngay bây giờ.
            </p>
            <Link
              to="/select-test"
              className="group relative inline-flex items-center"
            >
               <div className="absolute -inset-1 bg-slate-900 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
               <div className="relative px-12 py-5 bg-slate-900 hover:bg-slate-800 text-white font-be-vietnam font-black text-lg rounded-2xl shadow-2xl transform transition-all active:scale-95 flex items-center">
                Bắt đầu ngay thôi!
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;