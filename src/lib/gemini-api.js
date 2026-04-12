// Gemini API integration for AI career analysis
// Uses gemini-2.5-flash model

export async function callGeminiAPI(prompt, retryCount = 1) {
  // Kiểm tra cache local
  const cacheKey = `gemini_cache_` + Array.from(prompt).reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0);
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s timeout

    // Gọi qua Netlify Function Proxy thay vì trực tiếp
    const response = await fetch('/.netlify/functions/api-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
          topP: 0.9,
          topK: 40
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.details || `API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Không nhận được phản hồi từ Gemini API');
    }

    const resultText = data.candidates[0].content.parts[0].text;
    
    // Lưu vào cache
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(resultText));
    } catch(e) { console.warn('Cache storage full'); }

    return resultText;
  } catch (error) {
    if (error.name === 'AbortError') {
      if (retryCount > 0) return callGeminiAPI(prompt, retryCount - 1);
      throw new Error('Thời gian phản hồi quá lâu (Timeout). Vui lòng thử lại.');
    }
    
    if (retryCount > 0 && !error.message.includes('API key')) {
      console.log('Đang thử kết nối lại Gemini API...');
      return callGeminiAPI(prompt, retryCount - 1);
    }
    throw new Error(`Lỗi khi gọi Gemini API: ${error.message}`);
  }
}

export function buildPrompt(hollandResult, mbtiResult, discResult, userCareers = []) {
  let prompt = `[VAI TRÒ]
Bạn là chuyên gia tư vấn hướng nghiệp với 20 năm kinh nghiệm,
am hiểu thị trường lao động Việt Nam và xu hướng AI toàn cầu.
Hãy phân tích kết quả trắc nghiệm và đưa ra tư vấn cụ thể,
thực tế, phù hợp với bối cảnh Việt Nam năm 2025-2035.
Trả lời bằng tiếng Việt, thân thiện nhưng chuyên nghiệp.

[QUAN TRỌNG]
- BẮT BUỘC trả lời đầy đủ 6 phần phân tích bên dưới.
- Dùng gạch đầu dòng, không viết đoạn văn dài.
- In đậm **từ khóa quan trọng** (tên nghề, kỹ năng, mức lương).
- Mỗi phần bắt đầu bằng heading ## có số thứ tự.
- Viết đầy đủ tên nghề, không viết tắt.

[DỮ LIỆU NGƯỜI DÙNG]
`;

  if (hollandResult) {
    prompt += `
--- KẾT QUẢ HOLLAND RIASEC ---
Mã Holland: ${hollandResult.code}
Điểm các nhóm:
  - R (Thực tế): ${hollandResult.percentages.R}%
  - I (Nghiên cứu): ${hollandResult.percentages.I}%
  - A (Nghệ thuật): ${hollandResult.percentages.A}%
  - S (Xã hội): ${hollandResult.percentages.S}%
  - E (Doanh nhân): ${hollandResult.percentages.E}%
  - C (Quy củ): ${hollandResult.percentages.C}%
Top nhóm nổi bật: ${hollandResult.topGroups.map(g => g.name).join(', ')}
`;
  }

  if (mbtiResult) {
    prompt += `
--- KẾT QUẢ MBTI ---
Kiểu tính cách: ${mbtiResult.type}
Tên: ${mbtiResult.profile.name}
Phần trăm các chiều:
  - E/I: ${mbtiResult.percentages.E}/${mbtiResult.percentages.I}%
  - S/N: ${mbtiResult.percentages.S}/${mbtiResult.percentages.N}%
  - T/F: ${mbtiResult.percentages.T}/${mbtiResult.percentages.F}%
  - J/P: ${mbtiResult.percentages.J}/${mbtiResult.percentages.P}%
Điểm mạnh: ${mbtiResult.profile.strengths.join(', ')}
`;
  }

  if (discResult) {
    prompt += `
--- KẾT QUẢ DISC ---
Phong cách: ${discResult.style}
Điểm các nhóm:
  - D (Thống trị): ${discResult.percentages.D}%
  - I (Ảnh hưởng): ${discResult.percentages.I}%
  - S (Ổn định): ${discResult.percentages.S}%
  - C (Cẩn thận): ${discResult.percentages.C}%
`;
  }

  if (userCareers && userCareers.length > 0) {
    prompt += `
--- NGÀNH NGHỀ NGƯỜI DÙNG QUAN TÂM (đã chọn khi đăng ký) ---
${userCareers.map((c, i) => `${i + 1}. ${c}`).join('\n')}
`;
  }

  prompt += `
[YÊU CẦU PHÂN TÍCH]
Hãy phân tích theo đúng cấu trúc sau và trả lời đầy đủ tất cả các phần:

1. ĐIỂM MẠNH NỔI BẬT
   Phân tích 3-5 điểm mạnh cá nhân dựa trên kết quả test. Mỗi điểm mạnh nên được giải thích ngắn gọn tại sao nó phù hợp với kết quả của người dùng.

2. TOP 3 NGHỀ PHÙ HỢP NHẤT
   Với mỗi nghề, cung cấp:
   - Tên nghề
   - Lý do tại sao phù hợp với người dùng
   - Mức lương trung bình tại Việt Nam
   - Triển vọng AI (Phát triển mạnh / Ổn định / Rủi ro cao)

3. LỘ TRÌNH CỤ THỂ
   Cho nghề phù hợp nhất, hãy đề xuất lộ trình học tập:
   - Cần học gì (chuyên ngành, khóa học)
   - Học ở đâu (gợi ý trường/trung tâm tại VN)
   - Mất bao lâu để có thể bắt đầu

4. KỸ NĂNG CẦN HỌC NGAY
   Liệt kê 5 kỹ năng ưu tiên trong bối cảnh AI đang thay đổi thị trường lao động. Mỗi kỹ năng nên có giải thích ngắn tại sao nó quan trọng.

5. CẢNH BÁO RỦI RO AI
   Phân tích phần nào trong các nghề gợi ý dễ bị AI thay thế và đề xuất cách phòng tránh:
   - Những công việc cụ thể nào trong nghề có nguy cơ cao
   - Cần làm gì để trở thành người khó thay thế hơn

6. CÂU HỎI TỰ VẤN
   Đưa ra 3 câu hỏi giúp người dùng tự khám phá sâu hơn về con đường sự nghiệp của mình. Các câu hỏi nên thực tế và có thể tự trả lời được.
${userCareers && userCareers.length > 0 ? `
7. ĐÁNH GIÁ NGÀNH NGHỀ ĐÃ CHỌN
   Người dùng đã chọn các ngành quan tâm khi đăng ký (xem phần "NGÀNH NGHỀ NGƯỜI DÙNG QUAN TÂM" ở trên).
   Hãy đánh giá CHI TIẾT từng ngành mà người dùng đã chọn:
   - Ngành đó có PHÙ HỢP với kết quả trắc nghiệm không? (Phù hợp cao / Phù hợp trung bình / Chưa phù hợp)
   - Giải thích TẠI SAO phù hợp hoặc không phù hợp (dựa vào Holland, MBTI, DISC)
   - Nếu PHÙ HỢP: đề xuất hành động cụ thể để theo đuổi ngành đó hiệu quả
   - Nếu CHƯA PHÙ HỢP: gợi ý ngành thay thế gần nhất phù hợp hơn với kết quả test, và giải thích vì sao
   - Đánh giá mức độ triển vọng của ngành đó trong 5-10 năm tới tại Việt Nam
` : ''}
- Sử dụng markdown: heading ##, danh sách -, in đậm **từ khóa**.
- In đậm tên nghề, kỹ năng, con số quan trọng bằng **bold**.
- Viết hoàn chỉnh, KHÔNG để dở dang giữa chừng.
- Tổng độ dài khoảng 1200-1800 từ.
- Kết thúc bài phân tích bằng dòng: "---\n*Chúc bạn tìm được con đường sự nghiệp phù hợp! 🌟*"`;

  return prompt;
}

export function buildChatPrompt(contextPrompt, userMessage, conversationHistory = []) {
  let prompt = `${contextPrompt}

[CUỘC HỘI thoại]
Bạn đã phân tích kết quả trắc nghiệm cho người dùng. Bây giờ họ đang hỏi thêm câu hỏi.

Lịch sử cuộc trò chuyện:
${conversationHistory.map(h => `${h.role === 'user' ? 'Người dùng' : 'Bạn'}: ${h.content}`).join('\n')}

Người dùng hỏi: ${userMessage}

Yêu cầu:
- Trả lời ngắn gọn, tập trung vào câu hỏi cụ thể
- Dựa trên kết quả trắc nghiệm đã phân tích trước đó
- Nếu câu hỏi không liên quan đến hướng nghiệp, hãy khéo léo chuyển về chủ đề
- Trả lời bằng tiếng Việt, thân thiện`;

  return prompt;
}

export default {
  callGeminiAPI,
  buildPrompt,
  buildChatPrompt
};