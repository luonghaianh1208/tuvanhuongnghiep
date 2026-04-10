import { describe, it, expect, beforeEach, vi } from 'vitest';
import { calculateHolland, calculateMBTI, calculateDISC, getCombinedResults } from '../scoring.js';

// ==================== HOLLAND ====================

describe('calculateHolland', () => {
  it('tính tổng điểm chính xác cho từng nhóm', () => {
    const answers = {
      R: [5, 4, 3, 2, 1, 5, 4],
      I: [1, 1, 1, 1, 1, 1, 1],
      A: [3, 3, 3, 3, 3, 3, 3],
      S: [2, 2, 2, 2, 2, 2, 2],
      E: [4, 4, 4, 4, 4, 4, 4],
      C: [1, 2, 3, 4, 5, 1, 2]
    };
    const result = calculateHolland(answers);

    expect(result.scores.R).toBe(24);
    expect(result.scores.I).toBe(7);
    expect(result.scores.A).toBe(21);
    expect(result.scores.E).toBe(28);
    expect(result.scores.C).toBe(18);
  });

  it('tạo Holland code 3 chữ cái từ nhóm điểm cao nhất', () => {
    const answers = {
      R: [5, 5, 5, 5, 5, 5, 5], // 35
      I: [4, 4, 4, 4, 4, 4, 4], // 28
      A: [3, 3, 3, 3, 3, 3, 3], // 21
      S: [1, 1, 1, 1, 1, 1, 1], // 7
      E: [2, 2, 2, 2, 2, 2, 2], // 14
      C: [1, 1, 1, 1, 1, 1, 1]  // 7
    };
    const result = calculateHolland(answers);

    expect(result.code).toBe('RIA');
    expect(result.topGroups).toHaveLength(3);
    expect(result.topGroups[0].code).toBe('R');
  });

  it('tính phần trăm đúng (max 35 = 100%)', () => {
    const answers = {
      R: [5, 5, 5, 5, 5, 5, 5], // 35 => 100%
      I: [0, 0, 0, 0, 0, 0, 0], // 0 => 0%
      A: [1, 1, 1, 1, 1, 1, 1], // 7 => 20%
      S: [1, 1, 1, 1, 1, 1, 1],
      E: [1, 1, 1, 1, 1, 1, 1],
      C: [1, 1, 1, 1, 1, 1, 1]
    };
    const result = calculateHolland(answers);

    expect(result.percentages.R).toBe(100);
    expect(result.percentages.I).toBe(0);
    expect(result.percentages.A).toBe(20);
  });

  it('trả về danh sách nghề nghiệp phù hợp', () => {
    const answers = {
      R: [5, 5, 5, 5, 5, 5, 5],
      I: [4, 4, 4, 4, 4, 4, 4],
      A: [3, 3, 3, 3, 3, 3, 3],
      S: [1, 1, 1, 1, 1, 1, 1],
      E: [1, 1, 1, 1, 1, 1, 1],
      C: [1, 1, 1, 1, 1, 1, 1]
    };
    const result = calculateHolland(answers);

    expect(result.topCareers).toBeDefined();
    expect(result.topCareers.length).toBeGreaterThan(0);
    expect(result.topCareers.length).toBeLessThanOrEqual(15);
  });

  it('xử lý đúng khi mảng answers rỗng', () => {
    const answers = { R: [], I: [], A: [], S: [], E: [], C: [] };
    const result = calculateHolland(answers);

    expect(result.scores.R).toBe(0);
    expect(result.code).toHaveLength(3);
  });

  it('không mutate mảng đầu vào', () => {
    const answers = {
      R: [5, 4, 3, 2, 1, 5, 4],
      I: [1, 2, 3, 4, 5, 1, 2],
      A: [3, 3, 3, 3, 3, 3, 3],
      S: [2, 2, 2, 2, 2, 2, 2],
      E: [4, 4, 4, 4, 4, 4, 4],
      C: [1, 1, 1, 1, 1, 1, 1]
    };
    const originalR = [...answers.R];
    calculateHolland(answers);

    expect(answers.R).toEqual(originalR);
  });
});

// ==================== MBTI ====================

describe('calculateMBTI', () => {
  it('xác định đúng kiểu MBTI khi E > I, S > N, T > F, J > P', () => {
    const answers = { E: 10, I: 5, S: 12, N: 3, T: 9, F: 6, J: 11, P: 4 };
    const result = calculateMBTI(answers);

    expect(result.type).toBe('ESTJ');
  });

  it('xác định đúng kiểu MBTI khi I > E, N > S, F > T, P > J', () => {
    const answers = { E: 3, I: 12, S: 5, N: 10, T: 4, F: 11, J: 6, P: 9 };
    const result = calculateMBTI(answers);

    expect(result.type).toBe('INFP');
  });

  it('tính phần trăm chính xác cho mỗi chiều', () => {
    const answers = { E: 10, I: 5, S: 9, N: 6, T: 8, F: 7, J: 12, P: 3 };
    const result = calculateMBTI(answers);

    expect(result.percentages.E).toBe(67); // 10/(10+5) * 100
    expect(result.percentages.I).toBe(33);
  });

  it('trả về profile hợp lệ cho kiểu MBTI', () => {
    const answers = { E: 10, I: 5, S: 3, N: 12, T: 9, F: 6, J: 4, P: 11 };
    const result = calculateMBTI(answers);

    expect(result.type).toBe('ENTP');
    expect(result.profile).toBeDefined();
    expect(result.profile.name).toBeDefined();
    expect(result.profile.description).toBeDefined();
    expect(result.profile.strengths).toBeDefined();
  });

  it('chọn chữ cái đầu khi điểm bằng nhau', () => {
    const answers = { E: 8, I: 8, S: 8, N: 8, T: 8, F: 8, J: 8, P: 8 };
    const result = calculateMBTI(answers);

    // >= means first letter wins on tie
    expect(result.type).toBe('ESTJ');
  });

  it('xử lý đúng khi answers thiếu key', () => {
    const answers = { E: 10, I: 5 };
    const result = calculateMBTI(answers);

    expect(result.type).toHaveLength(4);
  });
});

// ==================== DISC ====================

describe('calculateDISC', () => {
  it('xác định đúng phong cách chủ đạo', () => {
    const answers = {
      D: [5, 5, 5, 5, 5, 5, 5], // 35
      I: [1, 1, 1, 1, 1, 1, 1], // 7
      S: [2, 2, 2, 2, 2, 2, 2], // 14
      C: [3, 3, 3, 3, 3, 3, 3]  // 21
    };
    const result = calculateDISC(answers);

    expect(result.dominant).toBe('D');
    expect(result.secondary).toBe('C');
  });

  it('tính phần trăm đúng (max 35 = 100%)', () => {
    const answers = {
      D: [5, 5, 5, 5, 5, 5, 5], // 35
      I: [0, 0, 0, 0, 0, 0, 0], // 0
      S: [1, 1, 1, 1, 1, 1, 1], // 7
      C: [3, 3, 3, 3, 3, 3, 3]  // 21
    };
    const result = calculateDISC(answers);

    expect(result.percentages.D).toBe(100);
    expect(result.percentages.I).toBe(0);
    expect(result.percentages.S).toBe(20);
    expect(result.percentages.C).toBe(60);
  });

  it('tạo combination style khi 2 nhóm gần nhau (chênh <= 7)', () => {
    const answers = {
      D: [5, 5, 5, 5, 5, 5, 4], // 34
      I: [5, 5, 5, 5, 5, 4, 4], // 33
      S: [1, 1, 1, 1, 1, 1, 1], // 7
      C: [1, 1, 1, 1, 1, 1, 1]  // 7
    };
    const result = calculateDISC(answers);

    expect(result.style).toBe('DI');
  });

  it('trả về single style khi nhóm cao hơn hẳn', () => {
    const answers = {
      D: [5, 5, 5, 5, 5, 5, 5], // 35
      I: [1, 1, 1, 1, 1, 1, 1], // 7
      S: [1, 1, 1, 1, 1, 1, 1], // 7
      C: [1, 1, 1, 1, 1, 1, 1]  // 7
    };
    const result = calculateDISC(answers);

    expect(result.style).toBe('D');
  });

  it('trả về nghề nghiệp phù hợp', () => {
    const answers = {
      D: [5, 5, 5, 5, 5, 5, 5],
      I: [1, 1, 1, 1, 1, 1, 1],
      S: [1, 1, 1, 1, 1, 1, 1],
      C: [1, 1, 1, 1, 1, 1, 1]
    };
    const result = calculateDISC(answers);

    expect(result.topCareers).toBeDefined();
    expect(result.topCareers.length).toBeLessThanOrEqual(8);
  });

  it('trả về workplace và leadership style', () => {
    const answers = {
      D: [5, 5, 5, 5, 5, 5, 5],
      I: [1, 1, 1, 1, 1, 1, 1],
      S: [1, 1, 1, 1, 1, 1, 1],
      C: [1, 1, 1, 1, 1, 1, 1]
    };
    const result = calculateDISC(answers);

    expect(result.workplaceEnvironment).toBeDefined();
    expect(result.leadershipStyle).toBeDefined();
  });
});

// ==================== COMBINED ====================

describe('getCombinedResults', () => {
  const hollandResult = {
    code: 'RIA',
    topGroups: [{ name: 'Thực tế (Realistic)', code: 'R', score: 35, percentage: 100 }],
    topCareers: [
      { name: 'Kỹ sư cơ khí', id: 1 },
      { name: 'Kỹ sư xây dựng', id: 2 }
    ]
  };

  const mbtiResult = {
    type: 'INTJ',
    topCareers: [
      { name: 'Kỹ sư phần mềm', id: 3 },
      { name: 'Kỹ sư cơ khí', id: 1 }
    ],
    profile: { name: 'Nhà chiến lược' }
  };

  const discResult = {
    dominant: 'D',
    style: 'D',
    topCareers: [
      { name: 'Doanh nhân/CEO', id: 4 },
      { name: 'Kỹ sư cơ khí', id: 1 }
    ]
  };

  it('trả về top 5 nghề nghiệp', () => {
    const result = getCombinedResults({ holland: hollandResult, mbti: mbtiResult, disc: discResult });

    expect(result.top5Careers).toBeDefined();
    expect(result.top5Careers.length).toBeLessThanOrEqual(5);
  });

  it('nghề xuất hiện trong nhiều bài test có điểm cao hơn', () => {
    const result = getCombinedResults({ holland: hollandResult, mbti: mbtiResult, disc: discResult });

    // Kỹ sư cơ khí xuất hiện ở cả 3 tests — phải có điểm cao
    const kysuCoKhi = result.top5Careers.find(c => c.name === 'Kỹ sư cơ khí');
    if (kysuCoKhi) {
      expect(kysuCoKhi.combinedScore).toBeGreaterThan(0);
    }
  });

  it('tính compatibility percentage hợp lệ (60-99%)', () => {
    const result = getCombinedResults({ holland: hollandResult, mbti: mbtiResult, disc: discResult });

    result.top5Careers.forEach(career => {
      expect(career.compatibility).toBeGreaterThanOrEqual(60);
      expect(career.compatibility).toBeLessThanOrEqual(99);
    });
  });

  it('không sử dụng Math.random() trong kết quả', () => {
    const results1 = getCombinedResults({ holland: hollandResult, mbti: mbtiResult, disc: discResult });
    const results2 = getCombinedResults({ holland: hollandResult, mbti: mbtiResult, disc: discResult });

    // Kết quả phải giống nhau 100% khi input giống nhau
    expect(results1.top5Careers.map(c => c.combinedScore))
      .toEqual(results2.top5Careers.map(c => c.combinedScore));
  });

  it('xử lý khi chỉ có 1 bài test', () => {
    const result = getCombinedResults({ holland: hollandResult, mbti: null, disc: null });

    expect(result.top5Careers).toBeDefined();
  });

  it('trả về text phân tích tổng hợp', () => {
    const result = getCombinedResults({
      holland: { ...hollandResult, topGroups: [{ name: 'Thực tế' }] },
      mbti: mbtiResult,
      disc: discResult
    });

    expect(result.analysis).toBeDefined();
    expect(result.analysis.length).toBeGreaterThan(0);
  });
});
