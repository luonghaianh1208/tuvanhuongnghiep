// Danh sách 50+ nghề nghiệp tại Việt Nam
// Mỗi nghề có: tên, mô tả, mã Holland, MBTI phù hợp, DISC, mức lương, triển vọng AI

export const careers = [
  // Nhóm R - Realistic (Thực tế)
  {
    id: 1,
    name: "Kỹ sư cơ khí",
    description: "Thiết kế, chế tạo và bảo trì máy móc, thiết bị cơ khí",
    hollandCode: "R",
    mbti: ["ISTJ", "ISTP", "ESTJ"],
    disc: ["C", "D"],
    avgSalary: "15-30 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần kỹ năng thực hành và kinh nghiệm thực tế, khó thay thế hoàn toàn bằng AI"
  },
  {
    id: 2,
    name: "Thợ điện công nghiệp",
    description: "Lắp đặt, vận hành và bảo trì hệ thống điện trong nhà máy, xí nghiệp",
    hollandCode: "R",
    mbti: ["ISTP", "ESTP"],
    disc: ["D", "C"],
    avgSalary: "10-20 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Công việc đòi hỏi xử lý tình huống thực tế tại chỗ, không thể số hóa hoàn toàn"
  },
  {
    id: 3,
    name: "Kỹ sư xây dựng",
    description: "Thiết kế, giám sát và quản lý các công trình xây dựng",
    hollandCode: "RIC",
    mbti: ["ISTJ", "INTJ", "ESTJ"],
    disc: ["D", "C"],
    avgSalary: "20-40 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần quản lý con người, xử lý địa điểm thực tế và ra quyết định nhanh trên công trường"
  },
  {
    id: 4,
    name: "Nông dân công nghệ cao",
    description: "Ứng dụng công nghệ vào sản xuất nông nghiệp, vận hành máy móc nông nghiệp",
    hollandCode: "RI",
    mbti: ["ISTJ", "ISFJ"],
    disc: ["C", "S"],
    avgSalary: "8-15 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "AI và IoT đang cách mạng hóa nông nghiệp, nhu cầu nhân lực công nghệ nông nghiệp tăng cao"
  },
  {
    id: 5,
    name: "Thợ sửa ô tô",
    description: "Chẩn đoán và sửa chữa hệ thống xe ô tô, bảo dưỡng định kỳ",
    hollandCode: "R",
    mbti: ["ISTP", "ESTP"],
    disc: ["D"],
    avgSalary: "10-25 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần kỹ năng thực hành và chẩn đoán lỗi phức tạp, AI hỗ trợ nhưng không thay thế hoàn toàn"
  },
  {
    id: 6,
    name: "Điều khiển tàu biển",
    description: "Điều khiển và vận hành tàu thuyền trên các tuyến đường biển",
    hollandCode: "RE",
    mbti: ["ISTJ", "ESTJ"],
    disc: ["D", "C"],
    avgSalary: "25-45 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần ra quyết định trong tình huống khẩn cấp và xử lý môi trường biển phức tạp"
  },
  {
    id: 7,
    name: "Phi công",
    description: "Điều khiển máy bay, đảm bảo an toàn bay",
    hollandCode: "RE",
    mbti: ["ENTJ", "ESTJ", "ISTJ"],
    disc: ["D"],
    avgSalary: "50-100 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "AI hỗ trợ nhưng phi công vẫn cần thiết cho an toàn và xử lý khẩn cấp"
  },

  // Nhóm I - Investigative (Nghiên cứu)
  {
    id: 8,
    name: "Nhà khoa học dữ liệu",
    description: "Phân tích dữ liệu lớn, xây dựng mô hình dự đoán bằng AI và machine learning",
    hollandCode: "I",
    mbti: ["INTJ", "INTP", "ENTP"],
    disc: ["I", "C"],
    avgSalary: "25-50 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Nhu cầu tăng cao với sự bùng nổ dữ liệu, là nhân tố chính phát triển AI"
  },
  {
    id: 9,
    name: "Chuyên gia AI/Machine Learning",
    description: "Nghiên cứu và phát triển các thuật toán trí tuệ nhân tạo",
    hollandCode: "I",
    mbti: ["INTJ", "INTP", "ENTP"],
    disc: ["I", "C"],
    avgSalary: "30-80 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Nghề trực tiếp tạo ra AI - nhu cầu tăng trưởng vượt bậc"
  },
  {
    id: 10,
    name: "Bác sĩ y học cổ truyền",
    description: "Khám chữa bệnh bằng phương pháp y học cổ truyền Việt Nam",
    hollandCode: "IS",
    mbti: ["INFJ", "ISFJ", "INTJ"],
    disc: ["S", "I"],
    avgSalary: "15-30 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Y học cá nhân hóa và kết hợp y cổ truyền đang được chú trọng"
  },
  {
    id: 11,
    name: "Nhà nghiên cứu y sinh",
    description: "Nghiên cứu phát triển thuốc mới, phương pháp điều trị tiên tiến",
    hollandCode: "I",
    mbti: ["INTJ", "INTP", "INFJ"],
    disc: ["C", "I"],
    avgSalary: "15-35 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "AI đẩy nhanh nghiên cứu dược phẩm, nhu cầu nhân lực nghiên cứu tăng"
  },
  {
    id: 12,
    name: "Chuyên gia an ninh mạng",
    description: "Bảo vệ hệ thống, phát hiện và ngăn chặn tấn công mạng",
    hollandCode: "IC",
    mbti: ["INTJ", "INTP", "ISTP"],
    disc: ["C", "D"],
    avgSalary: "25-50 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "An ninh mạng ngày càng quan trọng, AI tạo ra cả cơ hội lẫn thách thức mới"
  },
  {
    id: 13,
    name: "Kỹ sư phần mềm",
    description: "Phát triển, bảo trì và nâng cấp phần mềm, ứng dụng",
    hollandCode: "I",
    mbti: ["INTJ", "INTP", "ENTJ"],
    disc: ["I", "C"],
    avgSalary: "20-50 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Nhu cầu phần mềm tăng, AI hỗ trợ nhưng không thay thế lập trình viên giỏi"
  },
  {
    id: 14,
    name: "Nhà vật lý học",
    description: "Nghiên cứu các hiện tượng vật lý, phát triển công nghệ mới",
    hollandCode: "I",
    mbti: ["INTJ", "INTP"],
    disc: ["C", "I"],
    avgSalary: "15-30 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Nghiên cứu cơ bản cần tư duy sáng tạo, AI hỗ trợ tính toán"
  },

  // Nhóm A - Artistic (Nghệ thuật)
  {
    id: 15,
    name: "Nhà thiết kế đồ họa",
    description: "Thiết kế logo, banner, quảng cáo, giao diện sản phẩm số",
    hollandCode: "A",
    mbti: ["ENFP", "INFP", "ESFP"],
    disc: ["I", "S"],
    avgSalary: "12-25 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "AI như Midjourney, DALL-E có thể thay thế nhiều công việc thiết kế cơ bản"
  },
  {
    id: 16,
    name: "Diễn viên/Nghệ sĩ biểu diễn",
    description: "Biểu diễn trong phim ảnh, sân khấu, truyền hình",
    hollandCode: "AS",
    mbti: ["ENFP", "ESFP", "INFP"],
    disc: ["I", "S"],
    avgSalary: "10-50 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Nghệ thuật biểu diễn đòi hỏi cảm xúc và tương tác trực tiếp, khó thay thế"
  },
  {
    id: 17,
    name: "Nhạc sĩ/Sáng tác",
    description: "Sáng tác nhạc, hòa âm, phối khí cho các dự án âm nhạc",
    hollandCode: "A",
    mbti: ["ENFP", "INFP", "INTP"],
    disc: ["I", "S"],
    avgSalary: "8-30 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "AI có thể sáng tác nhạc cơ bản, nhưng sáng tạo đích thực vẫn cần con người"
  },
  {
    id: 18,
    name: "Content Creator",
    description: "Tạo nội dung sáng tạo cho mạng xã hội, youtube, blog",
    hollandCode: "AE",
    mbti: ["ENFP", "ENTP", "ESFP"],
    disc: ["I", "S"],
    avgSalary: "10-40 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Nhu cầu nội dung tăng cao, AI hỗ trợ nhưng sáng tạo cá nhân vẫn quan trọng"
  },
  {
    id: 19,
    name: "Kiến trúc sư",
    description: "Thiết kế các công trình kiến trúc, quy hoạch không gian",
    hollandCode: "AI",
    mbti: ["INTJ", "ENTJ", "ENFP"],
    disc: ["I", "D"],
    avgSalary: "20-45 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần sáng tạo và hiểu nhu cầu con người, AI hỗ trợ thiết kế nhưng không thay thế"
  },
  {
    id: 20,
    name: "Nhà văn/Biên kịch",
    description: "Viết truyện, kịch bản phim, bài viết chuyên đề",
    hollandCode: "A",
    mbti: ["INFP", "ENFP", "INTJ"],
    disc: ["I", "S"],
    avgSalary: "10-30 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "AI viết nội dung cơ bản tốt, nhưng văn phong và cảm xúc độc đáo vẫn cần con người"
  },
  {
    id: 21,
    name: "Photographer",
    description: "Nhiếp ảnh nghệ thuật, sự kiện, quảng cáo",
    hollandCode: "A",
    mbti: ["INFP", "ENFP", "ISFP"],
    disc: ["I", "S"],
    avgSalary: "8-25 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "AI tạo ảnh ngày càng tốt, nhưng nhiếp ảnh sự kiện thực vẫn cần con người"
  },
  {
    id: 22,
    name: "Game Designer",
    description: "Thiết kế gameplay, cốt truyện, nhân vật cho game",
    hollandCode: "AI",
    mbti: ["ENFP", "INTP", "ENTP"],
    disc: ["I", "D"],
    avgSalary: "15-35 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Ngành game đang bùng nổ, AI hỗ trợ nhưng sáng tạo vẫn cốt lõi"
  },

  // Nhóm S - Social (Xã hội)
  {
    id: 23,
    name: "Giáo viên",
    description: "Giảng dạy tại các trường học, trung tâm giáo dục",
    hollandCode: "S",
    mbti: ["ENFJ", "ESFJ", "INFJ"],
    disc: ["I", "S"],
    avgSalary: "8-20 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Giáo viên không chỉ dạy kiến thức mà còn nuôi dưỡng tâm hồn, kỹ năng xã hội"
  },
  {
    id: 24,
    name: "Tâm lý học",
    description: "Tư vấn tâm lý, trị liệu, hỗ trợ sức khỏe tinh thần",
    hollandCode: "S",
    mbti: ["INFJ", "ENFJ", "INFP"],
    disc: ["I", "S"],
    avgSalary: "15-35 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Nhu cầu chăm sóc sức khỏe tinh thần tăng cao, AI hỗ trợ nhưng không thay thế"
  },
  {
    id: 25,
    name: "Nhân viên công tác xã hội",
    description: "Hỗ trợ cộng đồng, giải quyết vấn đề xã hội",
    hollandCode: "S",
    mbti: ["ENFJ", "ESFJ", "INFJ"],
    disc: ["S", "I"],
    avgSalary: "8-15 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần hiểu và tương tác trực tiếp với con người trong hoàn cảnh thực"
  },
  {
    id: 26,
    name: "Huấn luyện viên thể thao",
    description: "Đào tạo, hướng dẫn tập luyện thể thao cho cá nhân và nhóm",
    hollandCode: "SR",
    mbti: ["ESTJ", "ESFJ", "ENTJ"],
    disc: ["D", "I"],
    avgSalary: "10-30 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần truyền cảm hứng, động viên trực tiếp, điều chỉnh theo từng người"
  },
  {
    id: 27,
    name: "Nhân viên chăm sóc khách hàng",
    description: "Tư vấn, hỗ trợ giải đáp thắc mắc khách hàng",
    hollandCode: "S",
    mbti: ["ENFJ", "ESFJ", "ENFP"],
    disc: ["I", "S"],
    avgSalary: "7-15 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "Chatbot và AI chatbot đang thay thế nhiều công việc chăm sóc khách hàng cơ bản"
  },
  {
    id: 28,
    name: "Điều dưỡng",
    description: "Chăm sóc bệnh nhân, hỗ trợ bác sĩ trong việc điều trị",
    hollandCode: "S",
    mbti: ["ISFJ", "ESFJ", "INFJ"],
    disc: ["S", "I"],
    avgSalary: "8-18 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần sự chăm sóc, cảm thông và xử lý tình huống trực tiếp"
  },
  {
    id: 29,
    name: "Luật sư",
    description: "Tư vấn pháp lý, đại diện bào chữa, soạn thảo hợp đồng",
    hollandCode: "SE",
    mbti: ["ENTJ", "INTJ", "ENFJ"],
    disc: ["D", "I"],
    avgSalary: "20-60 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "AI có thể nghiên cứu luật, tìm tiền lệ, nhưng kỹ năng biện luận và đàm phán vẫn cần con người"
  },
  {
    id: 30,
    name: "Nhà ngoại giao",
    description: "Công tác đối ngoại, đại diện quốc gia trong các vấn đề quốc tế",
    hollandCode: "SE",
    mbti: ["ENTJ", "ENFJ", "INTJ"],
    disc: ["D", "I"],
    avgSalary: "20-50 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần hiểu văn hóa, đàm phán và xây dựng quan hệ quốc tế"
  },

  // Nhóm E - Enterprising (Doanh nhân)
  {
    id: 31,
    name: "Doanh nhân/CEO",
    description: "Lãnh đạo, điều hành doanh nghiệp, ra quyết định chiến lược",
    hollandCode: "E",
    mbti: ["ENTJ", "ESTJ", "ENFJ"],
    disc: ["D", "I"],
    avgSalary: "50-200 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "AI hỗ trợ ra quyết định nhưng tầm nhìn và lãnh đạo vẫn cần con người"
  },
  {
    id: 32,
    name: "Marketing Manager",
    description: "Hoạch định chiến lược marketing, xây dựng thương hiệu",
    hollandCode: "E",
    mbti: ["ENTJ", "ENFJ", "ESFJ"],
    disc: ["D", "I"],
    avgSalary: "20-45 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "AI hỗ trợ phân tích nhưng sáng tạo chiến lược và hiểu con người vẫn cần"
  },
  {
    id: 33,
    name: "Nhân viên kinh doanh",
    description: "Tìm kiếm khách hàng, chào bán sản phẩm dịch vụ",
    hollandCode: "E",
    mbti: ["ENTJ", "ESTP", "ESFJ"],
    disc: ["D", "I"],
    avgSalary: "10-30 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "AI có thể hỗ trợ nhưng kỹ năng đàm phán, xây dựng quan hệ vẫn cần con người"
  },
  {
    id: 34,
    name: "Quản lý dự án",
    description: "Lập kế hoạch, điều phối và giám sát tiến độ dự án",
    hollandCode: "EC",
    mbti: ["ENTJ", "ESTJ", "INTJ"],
    disc: ["D", "I"],
    avgSalary: "20-40 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "AI hỗ trợ lập kế hoạch nhưng điều phối con người vẫn cần kỹ năng đặc biệt"
  },
  {
    id: 35,
    name: "Chuyên gia tư vấn chiến lược",
    description: "Tư vấn doanh nghiệp về chiến lược phát triển, tái cơ cấu",
    hollandCode: "EI",
    mbti: ["ENTJ", "INTJ", "ENFJ"],
    disc: ["D", "I"],
    avgSalary: "40-80 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần hiểu bối cảnh phức tạp, tư duy sáng tạo và kỹ năng giao tiếp cấp cao"
  },
  {
    id: 36,
    name: "Chủ shop TMĐT",
    description: "Kinh doanh trực tuyến trên các sàn thương mại điện tử",
    hollandCode: "E",
    mbti: ["ENTJ", "ESTP", "ENFP"],
    disc: ["D", "I"],
    avgSalary: "15-50 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "TMĐT tiếp tục tăng trưởng mạnh, AI hỗ trợ vận hành và marketing"
  },
  {
    id: 37,
    name: "HR Manager",
    description: "Quản lý nguồn nhân lực, tuyển dụng, đào tạo nhân viên",
    hollandCode: "SE",
    mbti: ["ENFJ", "ESFJ", "ENTJ"],
    disc: ["I", "S"],
    avgSalary: "20-40 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "AI có thể sàng lọc CV, nhưng phỏng vấn và xây dựng văn hóa vẫn cần con người"
  },

  // Nhóm C - Conventional (Quy củ)
  {
    id: 38,
    name: "Kế toán",
    description: "Ghi chép, phân tích số liệu tài chính, lập báo cáo",
    hollandCode: "C",
    mbti: ["ISTJ", "ISFJ", "INTJ"],
    disc: ["C", "S"],
    avgSalary: "10-25 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "Phần mềm kế toán và AI đang tự động hóa nhiều công việc kế toán cơ bản"
  },
  {
    id: 39,
    name: "Kiểm toán viên",
    description: "Đánh giá tính chính xác của báo cáo tài chính, hệ thống kiểm soát",
    hollandCode: "CI",
    mbti: ["ISTJ", "INTJ", "ESTJ"],
    disc: ["C", "D"],
    avgSalary: "20-40 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần phán đoán chuyên môn và trách nhiệm pháp lý, AI hỗ trợ nhưng không thay thế"
  },
  {
    id: 40,
    name: "Nhân viên ngân hàng",
    description: "Giao dịch, tư vấn sản phẩm ngân hàng cho khách hàng",
    hollandCode: "C",
    mbti: ["ISTJ", "ISFJ", "ESFJ"],
    disc: ["S", "C"],
    avgSalary: "10-20 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "Banking số hóa nhanh, nhiều giao dịch được tự động hóa"
  },
  {
    id: 41,
    name: "Thủ thư",
    description: "Quản lý, phân loại tài liệu trong thư viện, hỗ trợ tra cứu",
    hollandCode: "C",
    mbti: ["ISTJ", "ISFJ", "INFJ"],
    disc: ["S", "C"],
    avgSalary: "6-12 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "Số hóa sách và AI tìm kiếm đang thay thế nhiều công việc thủ thư"
  },
  {
    id: 42,
    name: "Nhân viên hành chính",
    description: "Xử lý hồ sơ, lịch làm việc, hỗ trợ văn phòng",
    hollandCode: "C",
    mbti: ["ISTJ", "ISFJ", "ESFJ"],
    disc: ["S", "C"],
    avgSalary: "7-15 triệu",
    aiOutlook: "Rủi ro cao",
    aiReason: "AI và automation đang thay thế nhiều công việc hành chính lặp đi lặp lại"
  },
  {
    id: 43,
    name: "Chuyên viên pháp chế",
    description: "Soạn thảo, rà soát hợp đồng, tư vấn pháp lý doanh nghiệp",
    hollandCode: "CI",
    mbti: ["ISTJ", "INTJ", "INFJ"],
    disc: ["C", "S"],
    avgSalary: "20-40 triệu",
    aiOutlook: "Ổn định",
    aiReason: "AI hỗ trợ nghiên cứu luật nhưng cần kinh nghiệm và phán đoán pháp lý"
  },
  {
    id: 44,
    name: "Nhà phân tích tài chính",
    description: "Phân tích dữ liệu tài chính, đánh giá đầu tư",
    hollandCode: "CI",
    mbti: ["INTJ", "ISTJ", "ENTJ"],
    disc: ["C", "D"],
    avgSalary: "25-50 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "AI phân tích dữ liệu nhanh hơn, nhưng cần con người để ra quyết định cuối cùng"
  },
  {
    id: 45,
    name: "Quản lý chuỗi cung ứng",
    description: "Điều phối logistic, quản lý kho vận, vận chuyển",
    hollandCode: "CE",
    mbti: ["ESTJ", "ISTJ", "ENTJ"],
    disc: ["D", "C"],
    avgSalary: "20-40 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "AI và IoT đang cách mạng hóa logistics, nhu cầu nhân lực công nghệ tăng cao"
  },

  // Nghề kết hợp nhiều nhóm
  {
    id: 46,
    name: "Bác sĩ đa khoa",
    description: "Khám, chẩn đoán và điều trị bệnh tổng quát cho bệnh nhân",
    hollandCode: "IS",
    mbti: ["ISFJ", "ISTJ", "ENFJ"],
    disc: ["S", "I"],
    avgSalary: "20-50 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "AI hỗ trợ chẩn đoán nhưng cần kỹ năng lâm sàng và giao tiếp với bệnh nhân"
  },
  {
    id: 47,
    name: "Kỹ sư DevOps",
    description: "Xây dựng và duy trì hạ tầng CI/CD, tự động hóa vận hành",
    hollandCode: "IR",
    mbti: ["ISTJ", "INTP", "ENTJ"],
    disc: ["C", "D"],
    avgSalary: "25-50 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Cloud và DevOps ngày càng quan trọng, AI tạo ra nhiều cơ hội mới"
  },
  {
    id: 48,
    name: "Chuyên viên UX/UI",
    description: "Thiết kế trải nghiệm và giao diện người dùng cho sản phẩm số",
    hollandCode: "AI",
    mbti: ["ENFP", "INTP", "ENTP"],
    disc: ["I", "D"],
    avgSalary: "18-35 triệu",
    aiOutlook: "Ổn định",
    aiReason: "Cần hiểu hành vi con người và sáng tạo, AI hỗ trợ nhưng không thay thế"
  },
  {
    id: 49,
    name: "Kỹ sư Robotics",
    description: "Thiết kế, chế tạo và lập trình robot cho công nghiệp và đời sống",
    hollandCode: "RI",
    mbti: ["INTJ", "ISTP", "ENTJ"],
    disc: ["C", "D"],
    avgSalary: "20-45 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Robotics và AI đang bùng nổ, nhu cầu nhân lực rất lớn"
  },
  {
    id: 50,
    name: "Chuyên gia Marketing số",
    description: "Chiến lược marketing online, SEO, quảng cáo số",
    hollandCode: "EA",
    mbti: ["ENTP", "ENFP", "ENTJ"],
    disc: ["I", "D"],
    avgSalary: "15-35 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Digital marketing ngày càng quan trọng, AI hỗ trợ nhưng chiến lược vẫn cần con người"
  },
  {
    id: 51,
    name: "Product Manager",
    description: "Quản lý phát triển sản phẩm từ ý tưởng đến ra mắt",
    hollandCode: "EAI",
    mbti: ["ENTJ", "ENFJ", "ENTP"],
    disc: ["D", "I"],
    avgSalary: "30-60 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Cần hiểu thị trường, công nghệ và con người - kỹ năng khó thay thế bằng AI"
  },
  {
    id: 52,
    name: "Kỹ sư Blockchain",
    description: "Phát triển ứng dụng blockchain, smart contract, Web3",
    hollandCode: "I",
    mbti: ["INTJ", "INTP", "ENTP"],
    disc: ["I", "C"],
    avgSalary: "30-70 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Blockchain và Web3 đang phát triển, cần chuyên gia kỹ thuật"
  },
  {
    id: 53,
    name: "Chuyên gia XR (AR/VR)",
    description: "Phát triển trải nghiệm thực tế tăng cường, thực tế ảo",
    hollandCode: "AI",
    mbti: ["INTP", "ENTP", "ENFP"],
    disc: ["I", "D"],
    avgSalary: "25-50 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Metaverse và XR đang nổi, nhu cầu nhân lực tăng trưởng mạnh"
  },
  {
    id: 54,
    name: "Green Energy Engineer",
    description: "Phát triển và vận hành hệ thống năng lượng tái tạo",
    hollandCode: "RI",
    mbti: ["ISTJ", "INTJ", "ENTJ"],
    disc: ["C", "D"],
    avgSalary: "20-45 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Chuyển đổi năng lượng xanh là xu hướng toàn cầu, nhu cầu nhân lực rất lớn"
  },
  {
    id: 55,
    name: "Kỹ sư AI Ethics",
    description: "Đảm bảo AI được phát triển và sử dụng có đạo đức, trách nhiệm",
    hollandCode: "I",
    mbti: ["INTJ", "INFJ", "ENTJ"],
    disc: ["C", "I"],
    avgSalary: "25-50 triệu",
    aiOutlook: "Phát triển mạnh",
    aiReason: "Nhu cầu ngày càng tăng khi AI phổ biến, cần chuyên gia hiểu cả kỹ thuật lẫn đạo đức"
  }
];

export default careers;