// 16 MBTI Profiles - Mô tả chi tiết cho 16 loại tính cách

export const mbtiProfiles = {
  INTJ: {
    name: "Nhà chiến lược",
    description: "INTJ là người có tư duy phân tích sắc bén, luôn hướng tới sự hoàn hảo và hiệu quả. Bạn có khả năng nhìn thấy bức tranh lớn và lập kế hoạch dài hạn một cách chiến lược. Độc lập và tự tin, bạn thích làm việc với các ý tưởng phức tạp và không ngại thách thức conventional thinking. Bạn đánh giá cao năng lực và sự thông minh, đồng thời kỳ vọng nhiều ở bản thân và người khác. Đôi khi có thể bị coi là lạnh lùng hoặc khó gần, nhưng thực tế bạn rất trung thành với những người bạn quan tâm.",
    strengths: ["Tư duy chiến lược xuất sắc", "Độc lập và tự tin", "Phân tích logic sắc bén", "Kỷ luật cao", "Sáng tạo trong việc giải quyết vấn đề"],
    suitableCareers: ["Chuyên gia AI/Machine Learning", "Nhà khoa học dữ liệu", "Kỹ sư phần mềm", "Kiến trúc sư", "Chuyên gia tư vấn chiến lược", "Quản lý dự án", "Nhà phân tích tài chính", "Kỹ sư Blockchain"],
    considerCareers: ["Giáo viên đại học", "Nhà nghiên cứu", "Thẩm phán", "Nhà văn chuyên nghiệp"],
    workplaceEnvironment: "Môi trường làm việc độc lập, nơi có thể sử dụng trí tuệ để giải quyết vấn đề phức tạp. Thích hợp với công việc đòi hỏi tư duy chiến lược và ít sự giám sát trực tiếp.",
    leadershipStyle: "Lãnh đạo bằng tầm nhìn và năng lực, tập trung vào hiệu quả và kết quả."
  },

  INTP: {
    name: "Nhà tư duy",
    description: "INTP là những người yêu thích tri thức, luôn tìm kiếm sự hiểu biết sâu sắc về thế giới. Bạn có tư duy phân tích逻辑 và khả năng nhìn nhận vấn đề từ nhiều góc độ khác nhau. Sáng tạo và tò mò, bạn thích khám phá các ý tưởng mới mẻ và xây dựng các hệ thống lý thuyết. Đôi k过度分析 nhưng điều này giúp bạn đưa ra những phân tích chính xác. Bạn thích làm việc một mình và cần thời gian riêng tư để suy nghĩ sâu.",
    strengths: ["Tư duy phân tích xuất sắc", "Sáng tạo ý tưởng", "Khả năng học hỏi nhanh", "Khách quan trong đánh giá", "Chuyên môn sâu"],
    suitableCareers: ["Nhà khoa học dữ liệu", "Kỹ sư phần mềm", "Chuyên gia AI/Machine Learning", "Nhà vật lý học", "Kế toán", "Chuyên gia XR (AR/VR)", "Nhà nghiên cứu y sinh", "Kỹ sư Robotics"],
    considerCareers: ["Giáo viên đại học", "Tư vấn công nghệ", "Phân tích hệ thống", "Thủ thư nghiên cứu"],
    workplaceEnvironment: "Môi trường cần sự tư duy sâu và khám phá tri thức. Thích hợp với nghiên cứu, phát triển và các công việc đòi hỏi đào sâu vào một lĩnh vực.",
    leadershipStyle: "Lãnh đạo bằng ý tưởng và chuyên môn, tạo không gian cho sự sáng tạo."
  },

  ENTJ: {
    name: "Nhà lãnh đạo",
    description: "ENTJ là những nhà lãnh đạo tự nhiên với tầm nhìn xa và khả năng truyền cảm hứng mạnh mẽ. Bạn có sự tự tin và quyết đoán để đưa ra quyết định và hành động. Trực tiếp và thẳng thắn, bạn không ngại đối mặt với các vấn đề khó khăn. Bạn đánh giá cao năng lực và muốn làm việc với những người giỏi. Có xu hướng cạnh tranh và thích thử thách. Đôi khi có thể bị coi là quá hung hăng, nhưng đó là vì bạn muốn đạt được kết quả tốt nhất.",
    strengths: ["Lãnh đạo tự nhiên", "Tầm nhìn chiến lược", "Quyết đoán", "Khả năng thuyết phục", "Tự tin và ambious"],
    suitableCareers: ["CEO/Doanh nhân", "Quản lý dự án", "Marketing Manager", "Chuyên gia tư vấn chiến lược", "Nhà ngoại giao", "HR Manager", "Nhà phân tích tài chính", "Product Manager"],
    considerCareers: ["Doanh nhân khởi nghiệp", "Chính trị gia", "Luật sư doanh nghiệp", "Giám đốc điều hành"],
    workplaceEnvironment: "Môi trường năng động với cơ hội phát triển và thăng tiến. Thích hợp với công việc đòi hỏi ra quyết định quan trọng và lãnh đạo nhóm.",
    leadershipStyle: "Lãnh đạo quyết đoán, hướng tới kết quả, truyền cảm hứng và động viên nhóm."
  },

  ENTP: {
    name: "Người tranh luận",
    description: "ENTP là những người yêu thích trí tuệ, thích thử thách và khám phá ý tưởng mới. Bạn có khả năng nhìn nhận vấn đề từ nhiều góc độ và tìm ra các giải pháp sáng tạo. Hài hước và duyên dáng, bạn thích tranh luận để hiểu sâu hơn. Thích hợp ứng vào tình huống mới, linh hoạt trong suy nghĩ. Đôi khi có thể thiếu kiên nhẫn với những công việc đòi hỏi sự tỉ mỉ. Bạn cần sự đa dạng và không gian sáng tạo.",
    strengths: ["Sáng tạo ý tưởng", "Khả năng thích ứng", "Tư duy nhanh nhạy", "Giao tiếp tốt", "Thích thử thách"],
    suitableCareers: ["Product Manager", "Chuyên gia Marketing số", "Content Creator", "Game Designer", "Khởi nghiệp", "Chuyên gia tư vấn chiến lược", "Chuyên gia XR (AR/VR)", "PR Manager"],
    considerCareers: ["Nhà phát minh", "Luật sư", "Nhà báo điều tra", "Tư vấn công nghệ"],
    workplaceEnvironment: "Môi trường năng động, nơi có thể thử nghiệm ý tưởng mới và không có ngày nào giống nhau. Thích hợp với startup và đổi mới sáng tạo.",
    leadershipStyle: "Lãnh đạo sáng tạo, khuyến khích đổi mới và không ngại thay đổi."
  },

  INFJ: {
    name: "Người bảo vệ lý tưởng",
    description: "INFJ là những người có tầm nhìn và lý tưởng cao đẹp, luôn mong muốn làm cho thế giới trở nên tốt đẹp hơn. Bạn có trực giác mạnh mẽ về con người và thường hiểu được cảm xúc của người khác. Lý tưởng và chính trực, bạn sẵn sàng hy sinh cho những điều bạn tin tưởng. Đồng cảm và quan tâm đến người khác, nhưng cũng cần thời gian ở một mình. Bạn có khả năng gây cảm hứng và truyền cảm hứng cho người khác.",
    strengths: ["Đồng cảm sâu sắc", "Lý tưởng và chính trực", "Trực giác về con người", "Khả năng gây cảm hứng", "Kiên trì với lý tưởng"],
    suitableCareers: ["Tâm lý học", "Giáo viên", "Nhà văn/Biên kịch", "Nhân viên công tác xã hội", "Chuyên gia tư vấn", "Nhà ngoại giao", "Kỹ sư AI Ethics", "Diễn viên"],
    considerCareers: ["Mục sư/Lãnh đạo tôn giáo", "Nhà hoạt động xã hội", "Thẩm phán", "Nhà nghiên cứu xã hội"],
    workplaceEnvironment: "Môi trường cần ý nghĩa và giá trị. Thích hợp với công việc giúp đỡ người khác và thay đổi xã hội tích cực.",
    leadershipStyle: "Lãnh đạo bằng lý tưởng và cảm hứng, quan tâm đến sự phát triển của từng cá nhân."
  },

  INFP: {
    name: "Người lý tưởng hóa",
    description: "INFP là những người lý tưởng hóa với mong muốn sống đúng với giá trị của mình. Bạn có khả năng cảm nhận sâu sắc về красивое và có óc thẩm mỹ tinh tế. Sáng tạo trong cách diễn đạt, bạn thích các hình thức nghệ thuật và ngôn từ. Điều quan trọng với bạn là sự authencicity và ý nghĩa trong công việc. Đôi khi bị coi là khó hiểu nhưng bạn có sự đồng cảm và quan tâm sâu sắc đến người khác. Bạn cần không gian để phát triển cá nhân.",
    strengths: ["Sáng tạo nghệ thuật", "Đồng cảm sâu sắc", "Nguyên tắc đạo đức cao", "Khả năng viết lách", "Lắng nghe chân thành"],
    suitableCareers: ["Nhà văn/Biên kịch", "Content Creator", "Thiết kế đồ họa", "Tâm lý học", "Giáo viên", "Photographer", "Nhạc sĩ/Sáng tác", "Designer"],
    considerCareers: ["Nhà thơ", "Nhà hoạt động xã hội", "Thư viện viên", "Chuyên gia phát triển cá nhân"],
    workplaceEnvironment: "Môi trường cần sự sáng tạo và không gian thể hiện cá nhân. Thích hợp với công việc liên quan đến nghệ thuật và giá trị con người.",
    leadershipStyle: "Lãnh đạo bằng cảm hứng và giá trị, tạo không gian cho sự phát triển cá nhân."
  },

  ENFJ: {
    name: "Người cho đi",
    description: "ENFJ là những người quan tâm đến người khác một cách chân thành và có khả năng truyền cảm hứng mạnh mẽ. Bạn có năng lực xã hội tốt, dễ dàng kết nối với mọi người. Ảnh hưởng và được yêu mến, bạn thường đóng vai trò lãnh đạo tự nhiên trong các nhóm. Lý tưởng và muốn giúp đỡ người khác phát triển. Bạn nhạy bén với nhu cầu của người khác và thích làm cho mọi người cảm thấy quan trọng. Đôi khi quá tập trung vào người khác mà quên đi bản thân.",
    strengths: ["Khả năng giao tiếp xuất sắc", "Đồng cảm và quan tâm", "Truyền cảm hứng", "Lãnh đạo tự nhiên", "Tổ chức tốt"],
    suitableCareers: ["Giáo viên", "HR Manager", "Marketing Manager", "Nhân viên công tác xã hội", "Tâm lý học", "Nhà ngoại giao", "Product Manager", "Huấn luyện viên"],
    considerCareers: ["Chính trị gia", "Nhà hoạt động xã hội", "Nhà tư vấn hôn nhân", "Diễn giả"],
    workplaceEnvironment: "Môi trường cần làm việc với con người và có tác động tích cực. Thích hợp với công việc đào tạo, phát triển và hỗ trợ người khác.",
    leadershipStyle: "Lãnh đạo phục vụ, quan tâm đến sự phát triển và hạnh phúc của từng thành viên."
  },

  ENFP: {
    name: "Người truyền cảm hứng",
    description: "ENFP là những người nhiệt huyết với cuộc sống, luôn nhìn thấy khả năng và tiềm năng trong mọi thứ. Bạn có năng lượng dồi dào và khả năng kết nối với mọi người. Sáng tạo và linh hoạt, bạn thích các ý tưởng mới và không ngại thử nghiệm. Hài hước và duyên dáng, bạn mang đến bầu không khí tích cực cho mọi nơi bạn đến. Bạn cần sự tự do và không gian để khám phá. Đôi khi khó tập trung nhưng bạn có khả năng nhìn thấy bức tranh lớn.",
    strengths: ["Năng lượng và nhiệt huyết", "Sáng tạo ý tưởng", "Khả năng giao tiếp", "Lạc quan và tích cực", "Thích ứng nhanh"],
    suitableCareers: ["Content Creator", "Marketing Manager", "Chuyên gia Marketing số", "Game Designer", "Nhà thiết kế đồ họa", "Diễn viên", "Khởi nghiệp", "PR Manager"],
    considerCareers: ["Nhà báo", "Nhà hoạt động xã hội", "Diễn giả", "Nhà tư vấn sáng tạo"],
    workplaceEnvironment: "Môi trường năng động với sự đa dạng và cơ hội sáng tạo. Thích hợp với công việc liên quan đến giao tiếp và truyền cảm hứng.",
    leadershipStyle: "Lãnh đạo truyền cảm hứng, tạo động lực và khuyến khích sự sáng tạo."
  },

  ISTJ: {
    name: "Người gác đền",
    description: "ISTJ là những người đáng tin cậy và có trách nhiệm, luôn thực hiện đúng cam kết của mình. Bạn có tổ chức và kỷ luật cao, thích làm việc theo quy trình rõ ràng. Thực tế và nhạy bén với các chi tiết quan trọng. Trung thành và bảo thủ, bạn đánh giá cao truyền thống và các giá trị đã được chứng minh. Đáng tin cậy và muốn người khác cũng đáng tin như vậy. Đôi khi có thể thiếu linh hoạt với các tình huống mới.",
    strengths: ["Đáng tin cậy", "Có trách nhiệm", "Kỷ luật cao", "Thực tế", "Chi tiết và chính xác"],
    suitableCareers: ["Kế toán", "Kiểm toán viên", "Quản lý chuỗi cung ứng", "Kỹ sư cơ khí", "Bác sĩ", "Thủ thư", "Kỹ sư xây dựng", "Nhân viên ngân hàng"],
    considerCareers: ["Phi công", "Điều tra viên", "Thẩm phán", "Quản lý hành chính"],
    workplaceEnvironment: "Môi trường cần sự ổn định, quy trình rõ ràng và có thể dự đoán được. Thích hợp với công việc đòi hỏi sự chính xác và đáng tin cậy.",
    leadershipStyle: "Lãnh đạo bằng gương mẫu và trách nhiệm, tổ chức rõ ràng và yêu cầu cao."
  },

  ISFJ: {
    name: "Người bảo vệ",
    description: "ISFJ là những người ấm áp và quan tâm, luôn đặt nhu cầu của người khác lên trên hết. Bạn có trí nhớ tốt về chi tiết cá nhân và thích giúp đỡ người khác một cách thực tế. Trung thành và tận tâm, bạn cam kết với những gì bạn làm. Đáng tin cậy và kiên nhẫn, bạn là chỗ dựa vững chắc cho những người xung quanh. Khiêm nhường nhưng có niềm tin mạnh mẽ vào những giá trị mình theo đuổi. Đôi khi quá tập trung vào nhu cầu người khác mà quên đi bản thân.",
    strengths: ["Âm iến và quan tâm", "Trung thành", "Đáng tin cậy", "Thực tế trong giúp đỡ", "Kiên nhẫn"],
    suitableCareers: ["Giáo viên", "Điều dưỡng", "Nhân viên công tác xã hội", "Kế toán", "Thủ thư", "Bác sĩ", "HR Manager", "Nhân viên hành chính"],
    considerCareers: ["Nha sĩ", "Thư viện viên", "Kế toán viên", "Chuyên gia dinh dưỡng"],
    workplaceEnvironment: "Môi trường cần sự hỗ trợ lẫn nhau và quan tâm đến con người. Thích hợp với công việc chăm sóc và phục vụ.",
    leadershipStyle: "Lãnh đạo phục vụ, quan tâm đến nhu cầu của từng cá nhân và bảo vệ nhóm."
  },

  ESTJ: {
    name: "Người điều hành",
    description: "ESTJ là những người có tổ chức và quyết đoán, luôn muốn đưa mọi thứ vào trật tự. Bạn có khả năng lãnh đạo tự nhiên và thích quản lý công việc một cách hiệu quả. Thực tế và nhạy bén với các chi tiết, đánh giá cao sự chính xác. Trực tiếp và nói thẳng, bạn không thích những điều vòng vo. Đáng tin cậy và muốn người khác cũng có trách nhiệm như mình. Đôi khi có thể thiếu linh hoạt và không kiên nhẫn với những người khác.",
    strengths: ["Tổ chức xuất sắc", "Quyết đoán", "Lãnh đạo tự nhiên", "Đáng tin cậy", "Thực tế"],
    suitableCareers: ["Quản lý dự án", "CEO/Doanh nhân", "Marketing Manager", "Kỹ sư xây dựng", "Quản lý chuỗi cung ứng", "HR Manager", "Bác sĩ", "Huấn luyện viên thể thao"],
    considerCareers: ["Quân nhân", "Cảnh sát", "Thẩm phán", "Quản lý logistics"],
    workplaceEnvironment: "Môi trường cần cấu trúc rõ ràng và mục tiêu cụ thể. Thích hợp với công việc đòi hỏi tổ chức và ra quyết định nhanh.",
    leadershipStyle: "Lãnh đạo quyết đoán, tổ chức rõ ràng và hướng tới kết quả."
  },

  ESFJ: {
    name: "Người quan tâm",
    description: "ESFJ là những người ấm áp và nhiệt tình, thích làm cho mọi người cảm thấy hài lòng và hòa thuận. Bạn có khả năng giao tiếp tốt và dễ dàng kết nối với người khác. Tổ chức và quan tâm đến chi tiết, bạn chú ý đến nhu cầu của mọi người xung quanh. Trung thành và đáng tin cậy, bạn cam kết với các mối quan hệ và trách nhiệm của mình. Được yêu mến vì sự ấm áp và hào phóng. Đôi khi quá lo lắng về việc người khác nghĩ gì và có thể thiếu tự phê bình.",
    strengths: ["Ấm áp và niềm iệu", "Giao tiếp tốt", "Tổ chức tốt", "Quan tâm đến người khác", "Đáng tin cậy"],
    suitableCareers: ["Giáo viên", "HR Manager", "Marketing Manager", "Nhân viên chăm sóc khách hàng", "Điều dưỡng", "Nhân viên công tác xã hội", "Bác sĩ", "Nhân viên ngân hàng"],
    considerCareers: ["Nhà tổ chức sự kiện", "Quản lý khách sạn", "Nhân viên lễ tân", "Chuyên gia quan hệ công chúng"],
    workplaceEnvironment: "Môi trường cần sự hài hòa và quan tâm đến con người. Thích hợp với công việc phục vụ và chăm sóc.",
    leadershipStyle: "Lãnh đạo quan tâm, đảm bảo mọi người đều được bao gồm và hỗ trợ."
  },

  ISTP: {
    name: "Người thợ máy",
    description: "ISTP là những người thực tế và thích tìm hiểu cách mọi thứ hoạt động. Bạn có khả năng phân tích vấn đề một cách logic và tìm ra giải pháp hiệu quả. Thích làm việc với tay và các công cụ, có kỹ năng thực hành tốt. Linh hoạt và thích ứng, bạn không ngại đối mặt với các tình huống mới. Độc lập và cần không gian tự do. Đôi khi có thể bị coi là khó hiểu vì ít nói trong nhiều tình huống.",
    strengths: ["Kỹ năng thực hành xuất sắc", "Phân tích vấn đề logic", "Linh hoạt", "Độc lập", "Bình tĩnh dưới áp lực"],
    suitableCareers: ["Thợ sửa ô tô", "Thợ điện công nghiệp", "Kỹ sư cơ khí", "Chuyên gia an ninh mạng", "Kỹ sư phần mềm", "Phi công", "Điều khiển tàu biển", "Kỹ sư Robotics"],
    considerCareers: ["Thợ kim hoàn", "Thợ mộc", "Kỹ sư ô tô", "Điều tra viên"],
    workplaceEnvironment: "Môi trường cần giải quyết vấn đề thực tế và ít quy tắc cứng nhắc. Thích hợp với công việc kỹ thuật và có tính độc lập.",
    leadershipStyle: "Lãnh đạo bằng kỹ năng và khả năng giải quyết vấn đề, hành động thực tế."
  },

  ISFP: {
    name: "Người nghệ sĩ",
    description: "ISFP là những người nhạy cảm và nghệ thuật, luôn tìm kiếm cách để thể hiện bản thân. Bạn có óc thẩm mỹ tinh tế và trân trọng красивое trong cuộc sống. Nhạy bén với cảm xúc của người khác và quan tâm đến nhu cầu của họ. Linh hoạt và thích ứng, bạn sẵn sàng thay đổi kế hoạch khi cần. Độc lập trong suy nghĩ và hành động. Đôi khi bị coi là khó hiểu vì ít chia sẻ suy nghĩ nội tâm.",
    strengths: ["Nghệ thuật và thẩm mỹ", "Nhạy cảm và đồng cảm", "Linh hoạt", "Tận tâm với giá trị", "Kỹ năng thực hành"],
    suitableCareers: ["Photographer", "Thiết kế đồ họa", "Nhạc sĩ/Sáng tác", "Diễn viên", "Thợ sửa ô tô", "Nông dân công nghệ cao", "Nhà văn", "Interior Designer"],
    considerCareers: ["Nghệ nhân", "Thợ kim hoàn", "Florist", "Nha sĩ"],
    workplaceEnvironment: "Môi trường cần sự sáng tạo và cá nhân hóa. Thích hợp với công việc nghệ thuật và thể hiện cá nhân.",
    leadershipStyle: "Lãnh đạo bằng cảm hứng và giá trị, tôn trọng sự độc lập của mỗi người."
  },

  ESTP: {
    name: "Người kinh doanh",
    description: "ESTP là những người năng động và thực tế, luôn tìm kiếm các cơ hội và thử thách mới. Bạn có khả năng giao tiếp tốt và dễ dàng thuyết phục người khác. Hành động nhanh và quyết đoán khi cần, không ngại đối mặt với các vấn đề. Thích làm việc với mọi người và có khả năng đàm phán tốt. Linh hoạt và thích ứng với mọi tình huống. Đôi khi có thể thiếu kiên nhẫn với những thứ quá lý thuyết hoặc lâu dài.",
    strengths: ["Năng động và quyết đoán", "Giao tiếp tốt", "Khả năng đàm phán", "Thực tế", "Thích ứng nhanh"],
    suitableCareers: ["Nhân viên kinh doanh", "Marketing Manager", "Thợ sửa ô tô", "Chủ shop TMĐT", "Khởi nghiệp", "PR Manager", "Quản lý dự án", "Bác sĩ cấp cứu"],
    considerCareers: ["Chính trị gia", "Nhân viên bất động sản", "Đại lý du lịch", "Nhân viên quảng cáo"],
    workplaceEnvironment: "Môi trường năng động với các thử thách và cơ hội liên tục. Thích hợp với công việc kinh doanh và giao tiếp.",
    leadershipStyle: "Lãnh đạo hành động, quyết đoán và tập trung vào kết quả ngay lập tức."
  },

  ESFP: {
    name: "Người trình diễn",
    description: "ESFP là những người hướng ngoại và nhiệt tình, luôn muốn chia sẻ niềm vui với người khác. Bạn có khả năng giao tiếp tốt và tạo không khí vui vẻ cho mọi người. Nghệ thuật và có óc thẩm mỹ, bạn thích красивое và muốn làm đẹp cho thế giới. Nhạy cảm với nhu cầu của người khác và thích giúp đỡ. Linh hoạt và sp，这里的",
    strengths: ["Năng lượng và nhiệt huyết", "Giao tiếp xuất sắc", "Nghệ thuật và sáng tạo", "Nhạy cảm với người khác", "Lạc quan"],
    suitableCareers: ["Diễn viên", "Content Creator", "Photographer", "Nhạc sĩ/Sáng tác", "Marketing Manager", "Nhân viên kinh doanh", "PR Manager", "Huấn luyện viên thể thao"],
    considerCareers: ["Nhà tổ chức sự kiện", "MC/Host", "Diễn giả", "Nhân viên du lịch"],
    workplaceEnvironment: "Môi trường vui vẻ và năng động với nhiều tương tác. Thích hợp với công việc trình diễn và giải trí.",
    leadershipStyle: "Lãnh đạo truyền cảm hứng và tạo động lực, mang lại bầu không khí tích cực."
  }
};

export default mbtiProfiles;